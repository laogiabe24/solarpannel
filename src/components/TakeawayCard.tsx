import type { Takeaway } from "../types";
import { TextLines } from "./TextLines";

interface TakeawayCardProps {
  takeaway: Takeaway;
}

export function TakeawayCard({ takeaway }: TakeawayCardProps) {
  return (
    <aside className="takeaway-card" data-animate="takeaway" aria-label="Key takeaway">
      <h3>{takeaway.title}</h3>
      <p>
        <TextLines text={takeaway.body} />
      </p>
    </aside>
  );
}
