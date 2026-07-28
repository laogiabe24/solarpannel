import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  bulletYBySlide,
  cardYBySlide,
  getHeadingSpec,
  getTakeawaySpec,
  iconPath,
  leadSpecs,
  memberNameY,
  statValueY,
  timelineCopyY,
  timelineY,
} from "../data/slideLayout";
import type { BulletItem, SlideData } from "../types";
import { getSchoolLogoPlacement } from "../data/schoolLogo";
import { BackgroundMedia } from "./BackgroundMedia";
import { SchoolLogo } from "./SchoolLogo";
import { SlideIcon } from "./SlideIcon";
import { TextLines } from "./TextLines";

interface SlideProps {
  slide: SlideData;
  active: boolean;
  shouldAnimate: boolean;
  onAnimated: (slideId: number) => void;
}

function lineCount(text: string | string[]) {
  return Array.isArray(text) ? text.length : 1;
}

function iconTop(textTop: number, text: string | string[], iconSize: number, lineHeightPx: number) {
  const blockHeight = lineCount(text) * lineHeightPx;
  return textTop + (blockHeight - iconSize) / 2;
}

function cardIconTop(itemTop: number, item: BulletItem, iconSize: number, slideId: number) {
  const titleLineHeight = slideId === 23 ? 22.5 : 24.2;
  const textLineHeight = slideId === 23 ? 22 : 23;
  const blockHeight = titleLineHeight + 8 + lineCount(item.text) * textLineHeight;
  return itemTop + (blockHeight - iconSize) / 2;
}

export function Slide({ slide, active, shouldAnimate, onAnimated }: SlideProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const heading = getHeadingSpec(slide.id);
  const lead = slide.lead ? leadSpecs[slide.id] : undefined;
  const schoolLogoPlacement = getSchoolLogoPlacement(slide.logoPlacement);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !active) {
      return;
    }

    const animatedNodes = root.querySelectorAll<HTMLElement>("[data-animate]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !shouldAnimate) {
      gsap.set(animatedNodes, { autoAlpha: 1, clearProps: "transform,filter,clipPath" });
      onAnimated(slide.id);
      return;
    }

    const context = gsap.context(() => {
      const kicker = Array.from(root.querySelectorAll<HTMLElement>('[data-animate="kicker"]'));
      const titleLines = Array.from(root.querySelectorAll<HTMLElement>(".title-line > span"));
      const leads = Array.from(
        root.querySelectorAll<HTMLElement>('[data-animate="lead"], .lead-rule'),
      );
      const stats = Array.from(root.querySelectorAll<HTMLElement>('[data-animate="stat"]'));
      const bullets = Array.from(root.querySelectorAll<HTMLElement>('[data-animate="bullet"]'));
      const itemIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-animate="item-icon"]'));
      const takeaway = Array.from(root.querySelectorAll<HTMLElement>('[data-animate="takeaway"]'));
      const allAnimatedNodes = [
        ...kicker,
        ...titleLines,
        ...leads,
        ...stats,
        ...bullets,
        ...itemIcons,
        ...takeaway,
      ];

      gsap.set(allAnimatedNodes, { autoAlpha: 0 });
      gsap.set(kicker, { x: -22 });
      gsap.set(titleLines, { y: 30 });
      gsap.set(leads, { y: 16 });
      gsap.set(stats, { y: 20 });
      gsap.set(bullets, { x: -16, y: 8 });
      gsap.set(itemIcons, { scale: 0.94 });
      gsap.set(takeaway, { y: 16, filter: "blur(3px)" });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(allAnimatedNodes, { clearProps: "transform,filter,clipPath" });
          onAnimated(slide.id);
        },
      });

      timeline
        .to(kicker, { autoAlpha: 1, x: 0, duration: 0.62 })
        .to(titleLines, { autoAlpha: 1, y: 0, duration: 0.82, stagger: 0.09 }, "-=0.14")
        .to(leads, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.06 }, "-=0.24")
        .to(stats, { autoAlpha: 1, y: 0, duration: 0.64, stagger: 0.13 }, "-=0.1")
        .to(itemIcons, { autoAlpha: 1, scale: 1, duration: 0.48, stagger: 0.11 }, "-=0.2")
        .to(bullets, { autoAlpha: 1, x: 0, y: 0, duration: 0.58, stagger: 0.12 }, "<")
        .to(
          takeaway,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.66,
          },
          "-=0.04",
        );
    }, root);

    return () => context.revert();
  }, [active, onAnimated, shouldAnimate, slide.id]);

  const renderHeading = () => {
    const HeadingTag = slide.layout === "cover" ? "h1" : "h2";

    return (
      <>
        <p
          className="slide-kicker stage-text"
          data-animate="kicker"
          style={{
            left: heading.sectionX,
            top: heading.sectionY,
            width: heading.sectionWidth,
            fontSize: heading.sectionFontSize,
          }}
        >
          {slide.section}
        </p>
        <HeadingTag
          className="slide-title stage-text"
          data-animate="title"
          style={{
            left: heading.titleX,
            top: heading.titleY,
            width: heading.titleWidth,
            fontSize: heading.titleFontSize,
            lineHeight: heading.titleLineHeight,
          }}
        >
          {slide.title.map((line) => (
            <span className="title-line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </HeadingTag>
        {slide.subtitle ? (
          <p
            className="slide-subtitle stage-text"
            data-animate="lead"
            style={{
              left: heading.subtitleX,
              top: heading.subtitleY,
              width: heading.subtitleWidth,
              fontSize: heading.subtitleFontSize,
            }}
          >
            {slide.subtitle}
          </p>
        ) : null}
      </>
    );
  };

  const renderLead = () => {
    if (!slide.lead || !lead || slide.layout === "timeline") {
      return null;
    }

    const ruleHeight = slide.lead.length * lead.fontSize * lead.lineHeight - 4;

    return (
      <>
        {lead.showRule ? (
          <span
            className="lead-rule"
            aria-hidden="true"
            style={{ left: 52, top: lead.y + 3, height: ruleHeight }}
          />
        ) : null}
        <p
          className="slide-lead stage-text"
          data-animate="lead"
          style={{
            left: lead.x,
            top: lead.y,
            width: lead.width,
            fontSize: lead.fontSize,
            lineHeight: lead.lineHeight,
          }}
        >
          <TextLines text={slide.lead} />
        </p>
      </>
    );
  };

  const renderMembers = () => {
    if (!slide.members) {
      return null;
    }

    return (
      <ol className="member-list">
        {slide.members.map((member, index) => {
          const hasNumber = Boolean(member.number);

          return (
            <li
              className="member-item"
              data-animate="bullet"
              key={member.name}
              style={{ left: 52, top: memberNameY[index], width: 620, height: 48 }}
            >
              {hasNumber ? <span className="member-number">{member.number}</span> : null}
              <span className={`member-name ${hasNumber ? "" : "member-name--plain"}`}>
                {member.name}
              </span>
              {member.role ? <span className="member-role">{member.role}</span> : null}
            </li>
          );
        })}
      </ol>
    );
  };

  const renderStats = () => {
    if (!slide.stats) {
      return null;
    }

    return (
      <>
        {slide.stats.map((stat, index) => (
          <div
            className="stat-block"
            data-animate="stat"
            key={`${stat.value}-${stat.label}`}
            style={{ left: 52, top: statValueY[index], width: 560, height: 48 }}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </>
    );
  };

  const renderStandardBullets = () => {
    if (!slide.bullets || slide.layout === "cards") {
      return null;
    }

    const positions = bulletYBySlide[slide.id] ?? [];
    const fontSize = slide.id === 13 ? 18.6 : 20.24;
    const lineHeightPx = fontSize * 1.28;
    const iconSize = 50;

    return (
      <>
        {slide.bullets.map((item, index) => {
          const y = positions[index] ?? 188 + index * 54;

          return (
            <div className="bullet-row" key={`${slide.id}-${index}`}>
              <SlideIcon
                src={iconPath(slide.id, index)}
                x={52}
                y={iconTop(y, item.text, iconSize, lineHeightPx)}
                width={iconSize}
                height={iconSize}
              />
              <p
                className="bullet-copy stage-text"
                data-animate="bullet"
                style={{
                  left: 118,
                  top: y,
                  width: 520,
                  fontSize,
                  lineHeight: 1.28,
                }}
              >
                <TextLines text={item.text} />
              </p>
            </div>
          );
        })}
      </>
    );
  };

  const renderCardBullets = () => {
    if (!slide.bullets || slide.layout !== "cards") {
      return null;
    }

    const positions = cardYBySlide[slide.id] ?? [];
    const titleFontSize = slide.id === 23 ? 19.2 : 21;
    const textFontSize = slide.id === 23 ? 17.2 : 18;
    const iconSize = slide.id === 23 ? 56 : 58;

    return (
      <>
        {slide.bullets.map((item, index) => {
          const y = positions[index] ?? 190 + index * 74;

          return (
            <div className="card-row" key={`${slide.id}-${item.title ?? index}`}>
              <SlideIcon
                src={iconPath(slide.id, index)}
                x={52}
                y={cardIconTop(y, item, iconSize, slide.id)}
                width={iconSize}
                height={iconSize}
              />
              <div
                className="card-copy stage-text"
                data-animate="bullet"
                style={{ left: 126, top: y, width: 520 }}
              >
                <strong style={{ fontSize: titleFontSize }}>{item.title}</strong>
                <span style={{ fontSize: textFontSize }}>
                  <TextLines text={item.text} />
                </span>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const renderTimeline = () => {
    if (!slide.timeline) {
      return null;
    }

    return (
      <>
        {slide.timeline.map((item, index) => (
          <div className="timeline-row" key={item.period}>
            <SlideIcon
              src={iconPath(slide.id, index)}
              x={52}
              y={timelineY[index] - 16}
              width={56}
              height={56}
            />
            <div
              className="timeline-copy stage-text"
              data-animate="bullet"
              style={{ left: 118, top: timelineY[index] - 0.2, width: 500, height: 58 }}
            >
              <strong>{item.period}</strong>
              <span style={{ top: timelineCopyY[index] - timelineY[index] + 0.2 }}>
                <TextLines text={item.text} />
              </span>
            </div>
          </div>
        ))}
        {slide.lead ? (
          <p
            className="timeline-note stage-text"
            data-animate="lead"
            style={{ left: 52, top: 369.5, width: 560, fontSize: 18.5 }}
          >
            <TextLines text={slide.lead} />
          </p>
        ) : null}
      </>
    );
  };

  const renderTakeaway = () => {
    if (!slide.takeaway) {
      return null;
    }

    const spec = getTakeawaySpec(slide.id);

    return (
      <aside
        className="takeaway-card"
        data-animate="takeaway"
        aria-label="Key takeaway"
        style={{ left: spec.x, top: spec.y, width: spec.width, height: spec.height }}
      >
        <h3>{slide.takeaway.title}</h3>
        <p>
          <TextLines text={slide.takeaway.body} />
        </p>
      </aside>
    );
  };

  return (
    <section
      ref={rootRef}
      className={`slide-stage slide--${slide.layout} slide--${slide.accent}`}
      aria-label={`Slide ${String(slide.id).padStart(2, "0")}: ${slide.title.join(" ")}`}
    >
      <div className="slide-background-layer">
        <BackgroundMedia imageSrc={slide.backgroundImage} videoSrc={slide.backgroundVideo} isActive={active} />
      </div>
      <div className="school-logo-layer">
        <SchoolLogo placement={schoolLogoPlacement} />
      </div>
      <div className="slide-content-layer stage-content">
        {renderHeading()}
        {renderLead()}
        {renderMembers()}
        {renderStats()}
        {renderStandardBullets()}
        {renderCardBullets()}
        {renderTimeline()}
        {renderTakeaway()}
      </div>
    </section>
  );
}