interface TextLinesProps {
  text: string | string[];
}

export function TextLines({ text }: TextLinesProps) {
  if (Array.isArray(text)) {
    return (
      <>
        {text.map((line) => (
          <span className="text-line" key={line}>
            {line}
          </span>
        ))}
      </>
    );
  }

  return <>{text}</>;
}
