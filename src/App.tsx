import { useEffect, useRef, useState } from 'react';

import AppLayout from './components/AppLayout';
import PageHeader from './components/PageHeader';
import TaskInput, { type NewTask } from './components/TaskInput';
import TaskList from './components/TaskList';
import type { Task } from './domain/Task';

const TASKS_KEY = 'tasks';

const hasProperty = <T extends string>(obj: object, key: T): obj is { [K in T]: unknown } => {
  return key in obj;
};

const isValidTask = (obj: unknown): obj is Task => {
  if (typeof obj !== 'object' || obj === null) return false;

  if (!hasProperty(obj, 'id') || typeof obj.id !== 'number') return false;
  if (!hasProperty(obj, 'title') || typeof obj.title !== 'string') return false;
  if (!hasProperty(obj, 'priority') || typeof obj.priority !== 'string') return false;
  if (!hasProperty(obj, 'type') || typeof obj.type !== 'string') return false;
  if (!hasProperty(obj, 'notes') || typeof obj.notes !== 'string') return false;
  if (!hasProperty(obj, 'isComplete') || typeof obj.isComplete !== 'boolean') return false;
  return true;
};

const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_KEY);
  if (!storedTasks) return [];
  try {
    const parsed: unknown = JSON.parse(storedTasks);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: unknown) => isValidTask(item));
  } catch {
    return [];
  }
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);
  const nextTaskIdRef = useRef(
    tasks.reduce((maxTaskId, task) => Math.max(maxTaskId, task.id), 0) + 1,
  );

  const handleAddTask = (newTask: NewTask) => {
    setTasks((prevTasks) => {
      const addedTask = {
        ...newTask,
        id: nextTaskIdRef.current,
      };
      nextTaskIdRef.current += 1;

      return [...prevTasks, addedTask];
    });
  };

  const handleTaskChange = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleRemoveTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AppLayout>
      <AppLayout.AppHeader title='Simple Todo' />
      <AppLayout.Content>
        <PageHeader title='Focus on what matters' subtitle='Ready to organize your day?' />
        <TaskInput onAdd={handleAddTask} />
        <TaskList tasks={tasks} onTaskChange={handleTaskChange} onRemoveTask={handleRemoveTask} />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
