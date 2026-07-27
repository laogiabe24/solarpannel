import { spawn, spawnSync } from "node:child_process";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "videotonghop");
const OUTPUT_DIR = path.join(ROOT, "public", "videos", "pingpong");
const REPORT_DIR = path.join(ROOT, "tmp");
const SUPPORTED_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);
const SEGMENT_SECONDS = 8;
const EXPECTED_SLIDES = 24;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: options.stdio ?? "pipe" });
    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (chunk) => {
      stdout += chunk;
      if (options.echo) process.stdout.write(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk;
      if (options.echo) process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error(`${command} exited with ${code}\n${stderr || stdout}`));
    });
  });
}

function ensureTool(name) {
  const result = spawnSync(name, ["-version"], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${name} is not available. Install FFmpeg and make sure ${name} is on PATH.`);
  }
}

function parseSlideNumber(fileName) {
  const match = fileName.match(/\d+/);
  if (!match) {
    throw new Error(`Cannot find a slide number in file name: ${fileName}`);
  }
  return Number(match[0]);
}

function rateToNumber(rate) {
  if (!rate || rate === "0/0") return 30;
  const [numerator, denominator] = rate.split("/").map(Number);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return 30;
  const fps = numerator / denominator;
  return Number.isFinite(fps) && fps >= 12 && fps <= 60 ? fps : 30;
}

function fpsFilterValue(fps) {
  return Number.isInteger(fps) ? String(fps) : fps.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

async function probe(filePath) {
  const { stdout } = await run("ffprobe", [
    "-v", "error",
    "-print_format", "json",
    "-show_format",
    "-show_streams",
    filePath,
  ]);
  const data = JSON.parse(stdout);
  const video = data.streams.find((stream) => stream.codec_type === "video");
  if (!video) {
    throw new Error(`No video stream found in ${filePath}`);
  }
  const audio = data.streams.some((stream) => stream.codec_type === "audio");
  const duration = Number(data.format.duration ?? video.duration ?? 0);
  const fps = rateToNumber(video.avg_frame_rate || video.r_frame_rate);
  return {
    duration,
    width: video.width,
    height: video.height,
    aspectRatio: video.width && video.height ? video.width / video.height : null,
    frameRate: video.avg_frame_rate || video.r_frame_rate,
    fps,
    codec: video.codec_name,
    pixelFormat: video.pix_fmt,
    hasAudio: audio,
    formatName: data.format.format_name,
    size: Number(data.format.size ?? 0),
  };
}

async function discoverVideos() {
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const videos = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const extension = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(extension)) continue;
    const slideNumber = parseSlideNumber(entry.name);
    videos.push({ slideNumber, fileName: entry.name, sourcePath: path.join(SOURCE_DIR, entry.name) });
  }

  videos.sort((a, b) => a.slideNumber - b.slideNumber);

  const seen = new Set();
  const duplicates = [];
  for (const video of videos) {
    if (seen.has(video.slideNumber)) duplicates.push(video.slideNumber);
    seen.add(video.slideNumber);
  }
  const missing = Array.from({ length: EXPECTED_SLIDES }, (_, index) => index + 1).filter(
    (slideNumber) => !seen.has(slideNumber),
  );

  if (videos.length !== EXPECTED_SLIDES || duplicates.length || missing.length) {
    throw new Error(
      `Expected videos numbered 1-${EXPECTED_SLIDES}. Found ${videos.length}. Missing: ${missing.join(", ") || "none"}. Duplicates: ${duplicates.join(", ") || "none"}.`,
    );
  }

  return videos;
}

async function shouldSkip(sourcePath, outputPath) {
  if (!existsSync(outputPath)) return false;
  const [sourceInfo, outputInfo] = await Promise.all([stat(sourcePath), stat(outputPath)]);
  return outputInfo.size > 0 && outputInfo.mtimeMs >= sourceInfo.mtimeMs;
}

async function buildVideo(video, sourceProbe) {
  const slideLabel = String(video.slideNumber).padStart(2, "0");
  const outputPath = path.join(OUTPUT_DIR, `slide_${slideLabel}.mp4`);
  const skip = await shouldSkip(video.sourcePath, outputPath);
  if (skip) {
    console.log(`skip slide_${slideLabel}.mp4 (up to date)`);
    return { outputPath, skipped: true };
  }

  const fps = sourceProbe.fps;
  const frameCount = Math.round(fps * SEGMENT_SECONDS);
  const reverseEndFrame = Math.max(2, frameCount - 1);
  const fpsValue = fpsFilterValue(fps);
  const filter = [
    `[0:v]trim=start=0:duration=${SEGMENT_SECONDS},setpts=PTS-STARTPTS,fps=${fpsValue},split=2[forward][tmp]`,
    `[tmp]reverse,trim=start_frame=1:end_frame=${reverseEndFrame},setpts=PTS-STARTPTS[reverse]`,
    `[forward][reverse]concat=n=2:v=1:a=0,format=yuv420p[v]`,
  ].join(";");

  console.log(`build slide_${slideLabel}.mp4 from ${video.fileName}`);
  await run("ffmpeg", [
    "-hide_banner",
    "-y",
    "-i", video.sourcePath,
    "-filter_complex", filter,
    "-map", "[v]",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "medium",
    "-crf", "22",
    "-movflags", "+faststart",
    "-an",
    outputPath,
  ], { echo: true });

  return { outputPath, skipped: false };
}

async function main() {
  ensureTool("ffmpeg");
  ensureTool("ffprobe");
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(REPORT_DIR, { recursive: true });

  const videos = await discoverVideos();
  const sourceReport = [];
  const outputReport = [];

  for (const video of videos) {
    const sourceProbe = await probe(video.sourcePath);
    if (sourceProbe.duration < SEGMENT_SECONDS) {
      throw new Error(`${video.fileName} is ${sourceProbe.duration.toFixed(3)}s, shorter than ${SEGMENT_SECONDS}s.`);
    }
    if (Math.abs((sourceProbe.aspectRatio ?? 0) - (16 / 9)) > 0.02) {
      throw new Error(`${video.fileName} is not close to 16:9 (${sourceProbe.width}x${sourceProbe.height}).`);
    }

    sourceReport.push({
      slide: video.slideNumber,
      fileName: video.fileName,
      duration: Number(sourceProbe.duration.toFixed(3)),
      width: sourceProbe.width,
      height: sourceProbe.height,
      frameRate: sourceProbe.frameRate,
      codec: sourceProbe.codec,
      pixelFormat: sourceProbe.pixelFormat,
      hasAudio: sourceProbe.hasAudio,
      size: sourceProbe.size,
    });

    const built = await buildVideo(video, sourceProbe);
    const outputProbe = await probe(built.outputPath);
    outputReport.push({
      slide: video.slideNumber,
      sourceFileName: video.fileName,
      outputFileName: path.basename(built.outputPath),
      skipped: built.skipped,
      duration: Number(outputProbe.duration.toFixed(3)),
      width: outputProbe.width,
      height: outputProbe.height,
      frameRate: outputProbe.frameRate,
      codec: outputProbe.codec,
      pixelFormat: outputProbe.pixelFormat,
      hasAudio: outputProbe.hasAudio,
      size: outputProbe.size,
    });
  }

  await writeFile(path.join(REPORT_DIR, "source-video-probe.json"), JSON.stringify(sourceReport, null, 2));
  await writeFile(path.join(REPORT_DIR, "pingpong-video-probe.json"), JSON.stringify(outputReport, null, 2));

  console.log(`source videos: ${sourceReport.length}`);
  console.log(`ping-pong videos: ${outputReport.length}`);
  console.log(`output: ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});