import SelectInput from "./SelectInput";
import { taskTypeColors, type TaskType } from "@/domain/TaskType";
import type { Option } from "./SelectInput";

type TypeSelectorProps = {
  value: TaskType;
  onChange: (value: TaskType) => void;
};

const types: Option[] = [
  { value: "Personal", label: "Personal", color: taskTypeColors.Personal },
  { value: "Work", label: "Work", color: taskTypeColors.Work },
  { value: "Shopping", label: "Shopping", color: taskTypeColors.Shopping },
  { value: "Health", label: "Health", color: taskTypeColors.Health },
  { value: "Finance", label: "Finance", color: taskTypeColors.Finance },
  { value: "General", label: "General", color: taskTypeColors.General },
];

const isTaskType = (value: string): value is TaskType => {
  return ["Personal", "Work", "Shopping", "Health", "Finance", "General"].includes(value);
};

const TypeSelector = ({ value, onChange }: TypeSelectorProps) => {
  const handleChange = (newValue: string) => {
    if (!isTaskType(newValue)) return;
    onChange(newValue);
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
