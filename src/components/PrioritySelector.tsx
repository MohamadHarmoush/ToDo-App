import SelectInput from "./SelectInput";
import { priorityColors, type Priority } from "../domain/Priority";
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

const PrioritySelector = ({ value, onChange }: PrioritySelectorProps) => {
  const handleChange = (newValue: string) => {
    const priority = priorities.find((option) => option.value === newValue);
    if (!priority) return;

    onChange(priority.value as Priority);
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
