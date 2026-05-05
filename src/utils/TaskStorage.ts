import type { Task } from '@/domain/Task';

import { isValidTask } from './TaskUtlis';

export const TASKS_KEY = 'tasks';

export const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_KEY);
  if (!storedTasks) return [];
  try {
    const parsed: unknown = JSON.parse(storedTasks);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: unknown) => isValidTask(item));
  } catch {
    return [];
  }
};

export const storeTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
