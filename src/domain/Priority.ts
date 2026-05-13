export type Priority = 'Low' | 'Medium' | 'High';

export const priorityColors: Record<Priority, string> = {
  Low: '#22c55e',
  Medium: '#cb673f',
  High: '#b91c1c',
};

export function getPriorityColor(priority: Priority): string {
  return priorityColors[priority];
}
