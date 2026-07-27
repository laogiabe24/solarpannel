import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DESIGN_HEIGHT, DESIGN_WIDTH } from "../data/slideLayout";
import { slides } from "../data/slides";
import { animationConfig } from "../data/videos";
import { resolveAssetPath } from "../utils/assets";
import { Slide } from "./Slide";

function parseHash() {
  const match = window.location.hash.match(/^#slide-(\d{1,2})$/);
  if (!match) {
    return 0;
  }

  const index = Number(match[1]) - 1;
  return Number.isFinite(index) && index >= 0 && index < slides.length ? index : 0;
}

function slideHash(index: number) {
  return `#slide-${String(index + 1).padStart(2, "0")}`;
}

function getStageScale() {
  return Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
}

export function Presentation() {
  const [current, setCurrent] = useState(() => parseHash());
  const [scale, setScale] = useState(() => getStageScale());
  const [playedSlides, setPlayedSlides] = useState<Set<number>>(() => new Set());
  const currentRef = useRef(current);
  const wheelLockedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const currentSlide = slides[current];
  const shouldAnimateCurrent = useMemo(
    () => animationConfig.replayAnimationsOnReturn || !playedSlides.has(currentSlide.id),
    [currentSlide.id, playedSlides],
  );

  const navigateTo = useCallback((targetIndex: number, historyMode: "push" | "replace" | "none" = "push") => {
    const clamped = Math.max(0, Math.min(slides.length - 1, targetIndex));
    if (clamped === currentRef.current) {
      return;
    }

    setCurrent(clamped);
    currentRef.current = clamped;

    if (historyMode !== "none") {
      const nextHash = slideHash(clamped);
      if (historyMode === "replace") {
        window.history.replaceState({ slide: clamped }, "", nextHash);
      } else {
        window.history.pushState({ slide: clamped }, "", nextHash);
      }
    }
  }, []);

  const previous = useCallback(() => navigateTo(currentRef.current - 1), [navigateTo]);
  const next = useCallback(() => navigateTo(currentRef.current + 1), [navigateTo]);

  const markSlideAnimated = useCallback((slideId: number) => {
    setPlayedSlides((previousSet) => {
      if (previousSet.has(slideId)) {
        return previousSet;
      }

      return new Set(previousSet).add(slideId);
    });
  }, []);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    const onResize = () => setScale(getStageScale());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState({ slide: current }, "", slideHash(current));
    }

    const onPopState = () => {
      navigateTo(parseHash(), "none");
    };

    const onHashChange = () => {
      navigateTo(parseHash(), "none");
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [current, navigateTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const nextKeys = ["ArrowRight", "ArrowDown", " ", "PageDown"];
      const previousKeys = ["ArrowLeft", "ArrowUp", "PageUp"];

      if (nextKeys.includes(event.key)) {
        event.preventDefault();
        next();
      }

      if (previousKeys.includes(event.key)) {
        event.preventDefault();
        previous();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24 || wheelLockedRef.current) {
        return;
      }

      event.preventDefault();
      wheelLockedRef.current = true;

      if (event.deltaY > 0) {
        next();
      } else {
        previous();
      }

      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, animationConfig.wheelLockMs);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, previous]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current == null) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - endY;
      if (Math.abs(delta) > 46) {
        if (delta > 0) {
          next();
        } else {
          previous();
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, previous]);

  useEffect(() => {
    const neighbors = [current - 1, current, current + 1].filter(
      (index) => index >= 0 && index < slides.length,
    );

    neighbors.forEach((index) => {
      const imgPath = resolveAssetPath(slides[index].backgroundImage);
      const image = new Image();
      image.decoding = "async";
      image.src = imgPath;

      const videoSrc = slides[index].backgroundVideo;
      if (videoSrc) {
        const videoPath = resolveAssetPath(videoSrc);
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = videoPath;
      }
    });
  }, [current]);

  return (
    <main className="presentation">
      <div className="ambient-bg" aria-hidden="true">
        <img src={resolveAssetPath(currentSlide.backgroundImage)} alt="" />
      </div>
      <div
        className="stage-shell"
        style={{ "--stage-scale": scale } as React.CSSProperties}
      >
        <Slide
          key={currentSlide.id}
          slide={currentSlide}
          active
          shouldAnimate={shouldAnimateCurrent}
          onAnimated={markSlideAnimated}
        />
      </div>
    </main>
  );
}