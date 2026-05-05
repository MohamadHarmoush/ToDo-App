import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

import type { Task } from '@/domain/Task';
import { taskReducer } from '@/utils/TaskReducer';
import { getStoredTasks } from '@/utils/TaskStorage';

export const tasksAtom = atomWithReducer(getStoredTasks(), taskReducer);
export const todos = atom<Task[]>([]);

export const sortedTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const completedTasks = tasks.filter((task) => task.isComplete);
  const pendingTasks = tasks.filter((task) => !task.isComplete);
  return [...pendingTasks, ...completedTasks];
});

//another way of using atom
// export const writableSortedAtom = atom<Task[], [Task[]], void>(
//   // Read function - returns the sorted tasks
//   (get) => {
//     const tasks = get(tasksAtom);
//     const completed = tasks.filter((t) => t.isComplete);
//     const pending = tasks.filter((t) => !t.isComplete);
//     return [...pending, ...completed];
//   },

//   // Write function - receives typed newTasks
//   (get, set, newTasks: Task[]) => {
//     // Since tasksAtom uses atomWithReducer, dispatch an action
//     // You'll need a replace/set action in your reducer
//     set(tasksAtom, { type: 'SET', payload: { tasks: newTasks } });
//   },
// );

//another way
/* export const todosAtomWithStorage = atomWithStorage<Task[]>(TASKS_KEY, [], {
  getItem: (key) => {
    const storedTasks = localStorage.getItem(key);
    if (!storedTasks) return [];
    try {
      const parsed: unknown = JSON.parse(storedTasks);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item: unknown) => isValidTask(item));
    } catch {
      return [];
    }
  },
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeItem: (key) => localStorage.removeItem(key),
}); */
