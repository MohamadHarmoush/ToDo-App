import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

import { taskReducer } from '@/utils/TaskReducer';
import { getStoredTasks } from '@/utils/TaskStorage';

export const todosAtom = atomWithReducer(getStoredTasks(), taskReducer);

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
