import type { Task } from './Task';

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Task }
  | { type: 'UPDATE_TODO'; payload: Task }
  | { type: 'REMOVE_TODO'; payload: { id: number } };

export const TodoActions = {
  add: (task: Task): TodoAction => ({ type: 'ADD_TODO', payload: task }),
  update: (task: Task): TodoAction => ({ type: 'UPDATE_TODO', payload: task }),
  remove: (id: number): TodoAction => ({ type: 'REMOVE_TODO', payload: { id } }),
};
