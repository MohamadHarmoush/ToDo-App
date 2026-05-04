import type { Task } from '@/domain/Task';

export const TASKS_KEY = 'tasks';

const hasProperty = <T extends string>(obj: object, key: T): obj is { [K in T]: unknown } => {
  return key in obj;
};

export const isValidTask = (obj: unknown): obj is Task => {
  if (typeof obj !== 'object' || obj === null) return false;

  if (!hasProperty(obj, 'id') || typeof obj.id !== 'number') return false;
  if (!hasProperty(obj, 'title') || typeof obj.title !== 'string') return false;
  if (!hasProperty(obj, 'priority') || typeof obj.priority !== 'string') return false;
  if (!hasProperty(obj, 'type') || typeof obj.type !== 'string') return false;
  if (!hasProperty(obj, 'notes') || typeof obj.notes !== 'string') return false;
  if (!hasProperty(obj, 'isComplete') || typeof obj.isComplete !== 'boolean') return false;
  return true;
};

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
