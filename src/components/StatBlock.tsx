import type { StatItem } from "../types";

interface StatBlockProps {
  stats: StatItem[];
}

export function StatBlock({ stats }: StatBlockProps) {
  return (
    <div className="stat-grid" aria-label="Solar resource statistics">
      {stats.map((stat) => (
        <div className="stat-block" data-animate="stat" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
