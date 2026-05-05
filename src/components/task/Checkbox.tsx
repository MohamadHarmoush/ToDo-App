type Props = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export const Checkbox = ({ id, checked, onChange, className = '' }: Props) => {
  return (
    <input
      type='checkbox'
      id={id}
      checked={checked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`mt-1 h-4 w-4 ${className}`}
    />
  );
};
