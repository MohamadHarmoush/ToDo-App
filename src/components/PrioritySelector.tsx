import SelectInput from "./SelectInput";
import { priorityColors, type Priority } from "@/domain/Priority";
import type { Option } from "./SelectInput";

type PrioritySelectorProps = {
  value: Priority;
  onChange: (value: Priority) => void;
};

const priorities: Option[] = [
  { value: "Low", label: "Low", color: priorityColors.Low },
  { value: "Medium", label: "Medium", color: priorityColors.Medium },
  { value: "High", label: "High", color: priorityColors.High },
];

const isPriority = (value: string): value is Priority => {
  return value === "Low" || value === "Medium" || value === "High";
};

const PrioritySelector = ({ value, onChange }: PrioritySelectorProps) => {
  const handleChange = (newValue: string) => {
    if (!isPriority(newValue)) return;
    onChange(newValue);
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
