import { getPriorityColor } from '@/domain/Priority';
import type { Priority } from '@/domain/Priority';
import { getTaskTypeColor } from '@/domain/TaskType';
import type { TaskType } from '@/domain/TaskType';

import { Badge } from './Badge';

type Props = {
  priority: Priority;
  type: TaskType;
  className?: string;
};

export const TaskBadges = ({ priority, type, className }: Props) => {
  const priorityColor = getPriorityColor(priority);
  const typeColor = getTaskTypeColor(type);

  return (
    <div className={`inline-flex w-fit gap-2 ${className}`}>
      <Badge label={priority} textColor={priorityColor} />
      <Badge label={type} textColor={typeColor} />
    </div>
  );
};
