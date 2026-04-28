type Props = {
  label: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
};

const hexToRgba = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Badge = ({ label, className = "", bgColor, textColor }: Props) => {
  const backgroundColor = bgColor
    ? hexToRgba(bgColor, 0.2)
    : textColor
      ? hexToRgba(textColor, 0.2)
      : undefined;

  return (
    <div
      className={`rounded-3xl w-fit px-2 ${className}`}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <h1>{label}</h1>
    </div>
  );
};
