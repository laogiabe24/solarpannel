export type Accent = "cyan" | "orange" | "green" | "red";

export type SlideLayout =
  | "cover"
  | "members"
  | "standard"
  | "stats"
  | "cards"
  | "timeline";

export interface StatItem {
  value: string;
  label: string;
}

export interface MemberItem {
  number?: string;
  name: string;
  role?: string;
}

export interface BulletItem {
  title?: string;
  text: string | string[];
  icon: string;
}

export interface TimelineItem {
  period: string;
  text: string | string[];
  icon: string;
}

export interface Takeaway {
  title: string;
  body: string | string[];
}

export interface LogoPlacement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SlideData {
  id: number;
  section: string;
  title: string[];
  subtitle?: string;
  lead?: string[];
  members?: MemberItem[];
  stats?: StatItem[];
  bullets?: BulletItem[];
  timeline?: TimelineItem[];
  takeaway?: Takeaway;
  backgroundImage: string;
  backgroundVideo?: string;
  logoPlacement?: LogoPlacement;
  accent: Accent;
  layout: SlideLayout;
}
