import { atom } from 'jotai';

import { createTask, deleteTask, updateTask } from '@/api';
import type { Task } from '@/domain/Task';
import type { TaskFormInput } from '@/domain/TaskFormInput';
import type { TodoAction } from '@/domain/TodoAction';
import { TodoActions } from '@/domain/TodoAction';
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

export const addTaskAtom = atom(null, async (_, set, input: TaskFormInput) => {
  try {
    const task = await createTask(input);
    set(tasksAtom, TodoActions.add(task));
  } catch (error) {
    console.error('Failed to create task:', error);
  }
});

// Update task - syncs to backend then updates local state
export const updateTaskAtom = atom(null, async (_, set, task: Task) => {
  try {
    const updatedTask = await updateTask(task);
    set(tasksAtom, TodoActions.update(updatedTask));
  } catch (error) {
    console.error('Failed to update task:', error);
  }
});

// Remove task - deletes from backend then removes from local state
export const removeTaskAtom = atom(null, async (_, set, taskId: string) => {
  try {
    await deleteTask(taskId);
    set(tasksAtom, TodoActions.remove(taskId));
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
});
