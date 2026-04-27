import type { Priority } from "./Priority";
import type { TaskType } from "./TaskType";

export interface Task {
  title: string;
  priority: Priority;
  type: TaskType;
  isActive: boolean;
}
