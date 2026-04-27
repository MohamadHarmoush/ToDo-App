import type { ChangeEvent } from "react";

export interface Option {
  value: string;
  label: string;
  color?: string;
}

interface SelectProps {
  name: string;
  options: Option[];
  value: string;
  defaultColor?: string;
  className?: string;
  onChange: (itemId: string) => void;
}
const SelectInput = ({
  name,
  value,
  options,
  defaultColor = "#374151",
  onChange,
  className = "",
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onChange(e.target.value);
  };
  const selectedColor = options.find((option) => option.value === value)?.color ?? defaultColor;

  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      style={{
        color: "white",
        background: selectedColor,
      }}
      className={`rounded-xl outline-none bg-gray-800/80 hover:bg-gray-800/80 
      px-2 ${className}`}
    >
      {options.map((option) => (
        <option
          style={option.color ? { color: option.color } : undefined}
          value={option.value}
          key={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
