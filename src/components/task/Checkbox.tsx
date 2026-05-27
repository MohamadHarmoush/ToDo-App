type Props = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox = ({ id, checked, onChange }: Props) => {
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
      className='mt-0.5 h-4 w-4 shrink-0'
    />
  );
};
