import { atom } from 'jotai';

import type { Task } from '@/domain/Task';
import type { TodoAction } from '@/domain/TodoAction';
import { taskReducer } from '@/utils/TaskReducer';

// Base atom - backend is source of truth
const baseTasksAtom = atom<Task[]>([]);

export const tasksAtom = atom(
  (get) => get(baseTasksAtom),
  (get, set, action: TodoAction) => {
    const currentTasks = get(baseTasksAtom);
    const newTasks = taskReducer(currentTasks, action);
    set(baseTasksAtom, newTasks);
  },
);

export const sortedTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  return [...pendingTasks, ...completedTasks];
});
