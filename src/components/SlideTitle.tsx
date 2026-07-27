interface SlideTitleProps {
  section: string;
  title: string[];
  subtitle?: string;
  cover?: boolean;
}

export function SlideTitle({ section, title, subtitle, cover }: SlideTitleProps) {
  const HeadingTag = cover ? "h1" : "h2";

  return (
    <header className="slide-heading">
      <p className="slide-kicker" data-animate="kicker">
        {section}
      </p>
      <HeadingTag className="slide-title" data-animate="title">
        {title.map((line) => (
          <span className="title-line" key={line}>
            <span>{line}</span>
          </span>
        ))}
      </HeadingTag>
      {subtitle ? (
        <p className="slide-subtitle" data-animate="lead">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
