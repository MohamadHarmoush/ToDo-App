import type { Task } from '@/domain/Task';

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
