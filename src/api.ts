import * as v from 'valibot';

import { TaskArraySchema, TaskFormInputSchema, TaskSchema } from './domain/schemas';
import type { Task } from './domain/Task';
import type { TaskFormInput } from './domain/TaskFormInput';
import { delay } from './utils/helpers';

export const API_URL = import.meta.env.VITE_API_URL;

async function validateResponse<S extends v.GenericSchema>(
  response: Response,
  schema: S,
): Promise<v.InferOutput<S>> {
  const data = await response.json();
  return v.parse(schema, data);
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error(`Fetching tasks failed: ${response.statusText}`);
  await delay(500);  // just to show the loading indicator, since the response is very quick.

  return validateResponse(response, TaskArraySchema);
}

export async function createTask(input: TaskFormInput): Promise<Task> {
  const validatedInput = v.parse(TaskFormInputSchema, input);

  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validatedInput),
  });

  if (!response.ok) throw new Error(`Create task failed: ${response.statusText}`);
  await delay(200); // just to show the loading indicator, since the response is very quick.
  return validateResponse(response, TaskSchema);
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await fetch(`${API_URL}/todos/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!response.ok) throw new Error(`Update task failed: ${response.statusText}`);
  return validateResponse(response, TaskSchema);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Delete task failed: ${response.statusText}`);
}
