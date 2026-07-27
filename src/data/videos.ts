export const videoConfig = {
  directory: "videos/pingpong",
  extension: "mp4",
};

export const animationConfig = {
  replayAnimationsOnReturn: true,
  transitionMs: 780,
  wheelLockMs: 920,
};

export function videoPath(slideId: number) {
  return `${videoConfig.directory}/slide_${String(slideId).padStart(2, "0")}.${
    videoConfig.extension
  }`;
}