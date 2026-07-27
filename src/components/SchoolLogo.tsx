import { schoolLogoPath } from "../data/schoolLogo";
import type { LogoPlacement } from "../types";
import { resolveAssetPath } from "../utils/assets";

interface SchoolLogoProps {
  placement: LogoPlacement;
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
      <img src={resolveAssetPath(schoolLogoPath)} alt="UAH" draggable={false} />
    </div>
  );
}