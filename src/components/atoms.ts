import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Task } from '@/domain/Task';
import type { TodoAction } from '@/domain/TodoAction';
import { TodoActions } from '@/domain/TodoAction';
import { taskReducer } from '@/utils/TaskReducer';
import { getStoredTasks, storeTasks, TASKS_KEY } from '@/utils/TaskStorage';

const taskStorage = {
  getItem: (_key: string): Task[] => getStoredTasks(),
  setItem: (_key: string, value: Task[]): void => storeTasks(value),
  removeItem: (_key: string): void => localStorage.removeItem(TASKS_KEY),
};

const baseTasksAtom = atomWithStorage<Task[]>(TASKS_KEY, [], taskStorage);

export const tasksAtom = atom(
  (get) => get(baseTasksAtom),
  (get, set, action: TodoAction) => {
    const currentTasks = get(baseTasksAtom);
    const newTasks = taskReducer(currentTasks, action);
    set(baseTasksAtom, newTasks);
  }
);

export const sortedTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const completedTasks = tasks.filter((task) => task.isComplete);
  const pendingTasks = tasks.filter((task) => !task.isComplete);
  return [...pendingTasks, ...completedTasks];
});

export const addTaskAtom = atom(null, (_, set, task: Task) => {
  const trimmedTitle = task.title.trim();
  if (!trimmedTitle) return;

  const action = TodoActions.add({ ...task, title: trimmedTitle, id: Date.now() });

  // Dispatch to tasksAtom - updates state AND auto-persists to localStorage
  set(tasksAtom, action);
});

// Action atom to update a task
export const updateTaskAtom = atom(null, (_, set, task: Task) => {
  const action = TodoActions.update(task);
  set(tasksAtom, action);
});

// Action atom to remove a task
export const removeTaskAtom = atom(null, (_, set, taskId: number) => {
  const action = TodoActions.remove(taskId);
  set(tasksAtom, action);
});
