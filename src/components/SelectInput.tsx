import type { ChangeEvent } from 'react';

export type Option<T = string> = {
  value: T;
  label: string;
  color?: string;
};

type SelectProps<T> = {
  name: string;
  options: Option<T>[];
  value: T;
  defaultColor?: string;
  className?: string;
  onChange: (value: T) => void;
};

const SelectInput = <T,>({
  name,
  value,
  options,
  defaultColor = '#374151',
  onChange,
  className = '',
}: SelectProps<T>) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selected = options.find((opt) => String(opt.value) === e.target.value);
    if (selected) {
      onChange(selected.value);
    }
  };
  const selectedColor = options.find((option) => option.value === value)?.color ?? defaultColor;

  return (
    <select
      name={name}
      value={String(value)}
      onChange={handleChange}
      style={{
        color: 'white',
        background: selectedColor,
      }}
      className={`rounded-xl bg-gray-800/80 px-2 outline-none hover:bg-gray-800/80 ${className}`}
    >
      {options.map((option) => (
        <option
          style={option.color ? { color: option.color } : undefined}
          value={String(option.value)}
          key={String(option.value)}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
