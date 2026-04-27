import SelectInput from "./SelectInput";

interface TypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}
const TypeSelector = ({ value, onChange }: TypeSelectorProps) => {
  const types = [
    { value: "Personal", label: "Personal", color: "#0EA5E9" }, // cyan-blue
    { value: "Work", label: "Work", color: "#8B5CF6" }, // violet
    { value: "Shopping", label: "Shopping", color: "#22C55E" }, // green
    { value: "Health", label: "Health", color: "#14B8A6" }, // teal
    { value: "Finance", label: "Finance", color: "#F59E0B" }, // amber
    { value: "General", label: "General", color: "#64748B" }, // slate
  ];
  const handleChange = (value: string) => {
    const type = types.find((option) => option.value === value);
    if (!type) return;

    onChange(type.value);
  };
  return (
    <SelectInput
      name="type"
      value={value}
      options={types}
      onChange={handleChange}
      defaultColor="#4b5563"
    />
  );
};

export default TypeSelector;
