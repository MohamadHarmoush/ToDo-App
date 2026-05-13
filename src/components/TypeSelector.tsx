import { taskTypeColors, type TaskType } from '@/domain/TaskType';

import SelectInput from './SelectInput';
import type { Option } from './SelectInput';

type TypeSelectorProps = {
  value: TaskType;
  onChange: (value: TaskType) => void;
};

const types: Option<TaskType>[] = [
  { value: 'Personal', label: 'Personal', color: taskTypeColors.Personal },
  { value: 'Work', label: 'Work', color: taskTypeColors.Work },
  { value: 'Shopping', label: 'Shopping', color: taskTypeColors.Shopping },
  { value: 'Health', label: 'Health', color: taskTypeColors.Health },
  { value: 'Finance', label: 'Finance', color: taskTypeColors.Finance },
  { value: 'General', label: 'General', color: taskTypeColors.General },
];

const TypeSelector = ({ value, onChange }: TypeSelectorProps) => {
  return (
    <SelectInput
      name='type'
      value={value}
      options={types}
      onChange={onChange}
      defaultColor='#4b5563'
    />
  );
};

export default TypeSelector;
