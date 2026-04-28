import type { Priority } from "./Priority";
import type { TaskType } from "./TaskType";

export type Task = {
  id: number;
  title: string;
  priority: Priority;
  type: TaskType;
  isComplete: boolean;
};
