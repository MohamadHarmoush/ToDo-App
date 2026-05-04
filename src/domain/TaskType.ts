export type TaskType = 'Personal' | 'Work' | 'Shopping' | 'Health' | 'Finance' | 'General';

export const taskTypeColors: Record<TaskType, string> = {
  Personal: '#3b82f6',
  Work: '#8b5cf6',
  Shopping: '#f59e0b',
  Health: '#10b981',
  Finance: '#ef4444',
  General: '#0b58cb',
};
