import type { Priority } from './Priority';
import type { TaskType } from './TaskType';

export type TaskFormInput = {
  title: string;
  priority: Priority;
  type: TaskType;
  notes: string;
};
