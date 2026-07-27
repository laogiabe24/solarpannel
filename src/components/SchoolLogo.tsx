import { schoolLogoPath } from "../data/schoolLogo";
import type { LogoPlacement } from "../types";

interface SchoolLogoProps {
  placement: LogoPlacement;
}

function resolveSchoolLogoSrc(src: string) {
  const isAbsolute = /^(?:[a-z]+:)?\//i.test(src);

  if (window.location.protocol === "file:" && src.startsWith("/brand/")) {
    return `dist${src}`;
  }

  if (window.location.protocol === "file:" && !isAbsolute && src.startsWith("brand/")) {
    return `dist/${src}`;
  }

  return src;
}

export function SchoolLogo({ placement }: SchoolLogoProps) {
  return (
    <div
      className="school-logo-cover"
      style={{
        left: placement.x,
        top: placement.y,
        width: placement.width,
        height: placement.height,
      }}
      aria-label="UAH"
    >
      <img src={resolveSchoolLogoSrc(schoolLogoPath)} alt="UAH" draggable={false} />
    </div>
  );
}