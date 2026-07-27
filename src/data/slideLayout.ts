export const DESIGN_WIDTH = 960;
export const DESIGN_HEIGHT = 540;

export interface HeadingSpec {
  sectionX: number;
  sectionY: number;
  sectionWidth: number;
  sectionFontSize: number;
  titleX: number;
  titleY: number;
  titleWidth: number;
  titleFontSize: number;
  titleLineHeight: number;
  subtitleX?: number;
  subtitleY?: number;
  subtitleWidth?: number;
  subtitleFontSize?: number;
}

export interface LeadSpec {
  x: number;
  y: number;
  width: number;
  fontSize: number;
  lineHeight: number;
  showRule: boolean;
}

export interface TakeawaySpec {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const defaultHeading: HeadingSpec = {
  sectionX: 52,
  sectionY: 38.7,
  sectionWidth: 760,
  sectionFontSize: 17.5,
  titleX: 52,
  titleY: 68.4,
  titleWidth: 690,
  titleFontSize: 35,
  titleLineHeight: 1.18,
};

export const headingOverrides: Record<number, Partial<HeadingSpec>> = {
  1: {
    sectionX: 60,
    sectionY: 117.6,
    sectionWidth: 430,
    sectionFontSize: 11,
    titleX: 58,
    titleY: 175.9,
    titleWidth: 520,
    titleFontSize: 58,
    titleLineHeight: 1,
    subtitleX: 61,
    subtitleY: 249,
    subtitleWidth: 460,
    subtitleFontSize: 25,
  },
  24: {
    titleY: 69.9,
    titleFontSize: 33,
    titleWidth: 620,
  },
};

export const leadSpecs: Record<number, LeadSpec> = {
  2: { x: 52, y: 138.2, width: 430, fontSize: 15.5, lineHeight: 1.25, showRule: false },
  3: { x: 70, y: 130.9, width: 520, fontSize: 20.24, lineHeight: 1.31, showRule: true },
  4: { x: 70, y: 130.9, width: 520, fontSize: 20.24, lineHeight: 1.31, showRule: true },
  5: { x: 70, y: 172.2, width: 560, fontSize: 20.24, lineHeight: 1.31, showRule: true },
  13: { x: 70, y: 172.2, width: 520, fontSize: 20.24, lineHeight: 1.31, showRule: true },
  14: { x: 70, y: 172.2, width: 520, fontSize: 20.24, lineHeight: 1.31, showRule: true },
  24: { x: 70, y: 167.5, width: 540, fontSize: 20.24, lineHeight: 1.31, showRule: true },
};

export const memberNameY = [184.4, 231.4, 278.4, 325.4, 372.4, 419.4];

export const statValueY = [165.3, 237.3];

export const bulletYBySlide: Record<number, number[]> = {
  3: [216.9, 270.9, 324.9, 382.5],
  4: [216.9, 274.5, 328.5, 386.2],
  5: [258.2, 315.8, 373.5],
  6: [339.2, 422.7],
  7: [339.2, 396.8],
  8: [339.2, 396.8],
  11: [189.2, 243.2, 300.8, 358.5, 416.1],
  13: [284.5, 335.5, 389.1, 440.1],
  14: [284.7, 342.3, 396.3],
  15: [189.2, 243.2, 297.2, 354.8, 412.5],
  16: [189.2, 243.2, 300.8, 358.5, 412.5],
  18: [189.2, 243.2, 300.8, 358.5],
  19: [189.2, 246.8, 304.5, 362.1, 419.7],
  21: [189.2, 246.8, 304.5, 358.5, 416.1],
  24: [280, 337.6, 395.2],
};

export const cardYBySlide: Record<number, number[]> = {
  9: [148.8, 236.1, 323.3],
  12: [190.1, 255.1, 342.4],
  17: [190.1, 255.1, 342.4],
  20: [190.1, 277.4, 342.4],
  22: [190.1, 255.1, 320.1],
  23: [189.9, 254.9, 319.9, 384.9],
};

export const timelineY = [191, 255, 319];
export const timelineCopyY = [190.7, 254.7, 318.7];

export const takeawayOverrides: Record<number, TakeawaySpec> = {
  5: { x: 650, y: 386, width: 272, height: 107 },
  10: { x: 650, y: 386, width: 272, height: 107 },
  15: { x: 650, y: 384, width: 272, height: 109 },
};

export function getHeadingSpec(slideId: number): HeadingSpec {
  return { ...defaultHeading, ...(headingOverrides[slideId] ?? {}) };
}

export function getTakeawaySpec(slideId: number): TakeawaySpec {
  return takeawayOverrides[slideId] ?? { x: 650, y: 370, width: 272, height: 123 };
}

export function iconPath(slideId: number, iconIndex: number) {
  const slide = String(slideId).padStart(2, "0");
  const icon = String(iconIndex + 1).padStart(2, "0");
  return `icons/solar_panel_icons_web_by_slide/slide_${slide}/icon_${icon}.png`;
}