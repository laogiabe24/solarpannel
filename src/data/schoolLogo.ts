import type { LogoPlacement } from "../types";

export const schoolLogoPath = "/brand/logouah.png";

export const defaultSchoolLogoPlacement: LogoPlacement = {
  x: 832,
  y: 430,
  width: 60,
  height: 60,
};

export function getSchoolLogoPlacement(placement?: LogoPlacement) {
  return placement ?? defaultSchoolLogoPlacement;
}