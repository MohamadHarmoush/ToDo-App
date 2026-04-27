import SelectInput from "./SelectInput";

interface PrioritySelectorProps {
  value: string;
  onChange: (value: string) => void;
}
const PrioritySelector = ({ value, onChange }: PrioritySelectorProps) => {
  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium", color: "#c2410c" },
    { value: "high", label: "High", color: "#b91c1c" },
  ];
  const handleChange = (value: string) => {
    const priority = priorities.find((option) => option.value === value);
    if (!priority) return;

    onChange(priority.value);
  };
  return (
    <SelectInput
      name="priority"
      value={value}
      options={priorities}
      onChange={handleChange}
      defaultColor="#4b5563"
    />
  );
};

export default PrioritySelector;
