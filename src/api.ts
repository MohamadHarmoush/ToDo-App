import type { Task } from './domain/Task';
import type { TaskFormInput } from './domain/TaskFormInput';

export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error(`Fetching tasks failed: ${response.statusText}`);
  return response.json();
}

export async function createTask(input: TaskFormInput): Promise<Task> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Create task failed: ${response.statusText}`);
  return response.json();
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await fetch(`${API_URL}/todos/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!response.ok) throw new Error(`Update task failed: ${response.statusText}`);
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Delete task failed: ${response.statusText}`);
}
