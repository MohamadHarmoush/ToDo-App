import { getPriorityColor } from '@/domain/Priority';
import type { Priority } from '@/domain/Priority';
import { taskTypeColors } from '@/domain/TaskType';
import type { TaskType } from '@/domain/TaskType';

import { Badge } from './Badge';

type Props = {
  priority: Priority;
  type: TaskType;
};

export const TaskBadges = ({ priority, type }: Props) => {
  const priorityColor = getPriorityColor(priority);
  const typeColor = taskTypeColors[type];

  return (
    <div className='inline-flex w-fit gap-2'>
      <Badge label={priority} textColor={priorityColor} />
      <Badge label={type} textColor={typeColor} />
    </div>
  );
};
