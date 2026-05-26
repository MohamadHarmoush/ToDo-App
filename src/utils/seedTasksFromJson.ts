import { createTask } from '../api';
import type { Task } from '../domain/Task';
import type { TaskFormInput } from '../domain/TaskFormInput';

// Import JSON with import attributes for Vite/ESM compatibility
import seedTasksData from '../data/seedTasks.json' with { type: 'json' };

/**
 * Seeds tasks from the JSON file by calling the createTask API.
 * Processes tasks sequentially with a small delay to avoid overwhelming the API.
 *
 * @param limit - Maximum number of tasks to create (default: all tasks in JSON)
 * @returns Promise resolving to array of created Tasks
 */
export async function seedTasksFromJson(limit?: number): Promise<Task[]> {
  const tasksToCreate: TaskFormInput[] = limit
    ? (seedTasksData as TaskFormInput[]).slice(0, limit)
    : (seedTasksData as TaskFormInput[]);

  const createdTasks: Task[] = [];

  for (const taskInput of tasksToCreate) {
    try {
      const createdTask = await createTask(taskInput);
      createdTasks.push(createdTask);
    } catch (error) {
      console.error(`Failed to create task "${taskInput.title}":`, error);
    }
  }

  console.log(`Successfully created ${createdTasks.length} tasks`);
  return createdTasks;
}

/**
 * Seeds exactly 100 tasks from the JSON file.
 * This is a convenience wrapper around seedTasksFromJson.
 *
 * @returns Promise resolving to array of created Tasks
 */
export async function seed100Tasks(): Promise<Task[]> {
  return seedTasksFromJson(100);
}
