type Props = {
  label: string;
  bgColor?: string;
  textColor?: string;
};

const hexToRgba = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace('#', '');
  const r = Number.parseInt(cleanHex.slice(0, 2), 16);
  const g = Number.parseInt(cleanHex.slice(2, 4), 16);
  const b = Number.parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Badge = ({ label, bgColor, textColor }: Props) => {
  const backgroundColor = bgColor
    ? hexToRgba(bgColor, 0.2)
    : textColor
      ? hexToRgba(textColor, 0.2)
      : undefined;

  return (
    <div
      className='w-fit rounded-3xl px-3 py-0.5 text-xs font-semibold'
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <span>{label}</span>
    </div>
  );
};
