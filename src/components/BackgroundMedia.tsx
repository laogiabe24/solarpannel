import { useEffect, useMemo, useRef, useState } from "react";

interface BackgroundMediaProps {
  imageSrc: string;
  videoSrc?: string;
  isActive: boolean;
}

function resolveVideoSrc(src?: string) {
  if (!src) {
    return undefined;
  }

  const isAbsolute = /^(?:[a-z]+:)?\//i.test(src);
  if (window.location.protocol === "file:" && !isAbsolute && src.startsWith("videos/")) {
    return `dist/${src}`;
  }

  return src;
}

export function BackgroundMedia({ imageSrc, videoSrc, isActive }: BackgroundMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resolvedVideoSrc = useMemo(() => resolveVideoSrc(videoSrc), [videoSrc]);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    setVideoReady(false);
    setVideoFailed(false);

    if (!video || !resolvedVideoSrc) {
      return;
    }

    let cancelled = false;

    const resetToStart = () => {
      try {
        video.currentTime = 0;
      } catch {
        // The browser may reject currentTime before metadata is available.
      }
    };

    const playActiveVideo = async () => {
      if (!isActive || cancelled) {
        return;
      }

      try {
        await video.play();
      } catch (error) {
        if (!cancelled && import.meta.env.DEV) {
          console.error("Background video failed to play", resolvedVideoSrc, error);
        }
      }
    };

    resetToStart();

    if (isActive) {
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setVideoReady(true);
        void playActiveVideo();
      } else {
        video.load();
      }
    } else {
      video.pause();
      resetToStart();
    }

    return () => {
      cancelled = true;
      video.pause();
      resetToStart();
    };
  }, [isActive, resolvedVideoSrc]);

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video || !isActive || !resolvedVideoSrc) {
      return;
    }

    setVideoReady(true);
    void video.play().catch((error) => {
      if (import.meta.env.DEV) {
        console.error("Background video failed to play", resolvedVideoSrc, error);
      }
    });
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !isActive) {
      return;
    }

    try {
      video.currentTime = 0;
    } catch {
      // Some browsers defer seeking until enough media is buffered.
    }
  };

  const handleError = () => {
    setVideoFailed(true);
    setVideoReady(false);
    if (import.meta.env.DEV && resolvedVideoSrc) {
      console.error("Background video failed to load", resolvedVideoSrc);
    }
  };

  return (
    <div className="background-media" aria-hidden="true">
      <img
        className="background-image"
        src={imageSrc}
        alt=""
        decoding="async"
        draggable={false}
      />

      {resolvedVideoSrc && !videoFailed ? (
        <video
          ref={videoRef}
          className={`slide-background-video ${videoReady ? "is-ready" : ""}`}
          src={resolvedVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={imageSrc}
          draggable={false}
          onCanPlay={handleCanPlay}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
        />
      ) : null}
    </div>
  );
}