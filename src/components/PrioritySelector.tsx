import SelectInput from "./SelectInput";

type PrioritySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const PrioritySelector = ({ value, onChange }: PrioritySelectorProps) => {
  const priorities = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium", color: "#c2410c" },
    { value: "High", label: "High", color: "#b91c1c" },
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
