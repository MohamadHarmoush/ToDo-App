import type { Task } from './Task';

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Task }
  | { type: 'UPDATE_TODO'; payload: Task }
  | { type: 'SET_TODOS'; payload: Task[] }
  | { type: 'REMOVE_TODO'; payload: { id: string } };

export const TodoActions = {
  add: (task: Task): TodoAction => ({ type: 'ADD_TODO', payload: task }),
  update: (task: Task): TodoAction => ({ type: 'UPDATE_TODO', payload: task }),
  setTasks: (tasks: Task[]): TodoAction => ({ type: 'SET_TODOS', payload: tasks }),
  remove: (id: string): TodoAction => ({ type: 'REMOVE_TODO', payload: { id } }),
};
