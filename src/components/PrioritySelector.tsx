import SelectInput from "./SelectInput";
import { priorityColors, type Priority } from "@/domain/Priority";
import type { Option } from "./SelectInput";

type PrioritySelectorProps = {
  value: Priority;
  onChange: (value: Priority) => void;
};

const priorities: Option<Priority>[] = [
  { value: "Low", label: "Low", color: priorityColors.Low },
  { value: "Medium", label: "Medium", color: priorityColors.Medium },
  { value: "High", label: "High", color: priorityColors.High },
];

const PrioritySelector = ({ value, onChange }: PrioritySelectorProps) => {
  return (
    <SelectInput
      name="priority"
      value={value}
      options={priorities}
      onChange={onChange}
      defaultColor="#4b5563"
    />
  );
};

export default PrioritySelector;
