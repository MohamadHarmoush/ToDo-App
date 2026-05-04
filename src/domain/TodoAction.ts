import type { Task } from './Task';

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Task }
  | { type: 'UPDATE_TODO'; payload: Task }
  | { type: 'REMOVE_TODO'; payload: { id: number } };
