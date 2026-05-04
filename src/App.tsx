import { useEffect, useReducer, useRef } from 'react';

import AppLayout from './components/AppLayout';
import PageHeader from './components/PageHeader';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import type { Task } from './domain/Task';
import type { TodoAction } from './domain/TodoAction';

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

const taskReducer = (prevState: Task[], action: TodoAction): Task[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...prevState, action.payload];
    case 'UPDATE_TODO':
      return prevState.map((task) => (task.id === action.payload.id ? action.payload : task));
    case 'REMOVE_TODO':
      return prevState.filter((task) => task.id !== action.payload.id);
    default:
      return prevState;
  }
};

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getStoredTasks);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AppLayout>
      <AppLayout.AppHeader title='Simple Todo' />
      <AppLayout.Content>
        <PageHeader title='Focus on what matters' subtitle='Ready to organize your day?' />
        <TaskInput
          onAdd={(addedTask) => {
            dispatch({ type: 'ADD_TODO', payload: addedTask });
          }}
        />
        <TaskList
          tasks={tasks}
          onTaskChange={(updatedTask) => {
            dispatch({ type: 'UPDATE_TODO', payload: updatedTask });
          }}
          onRemoveTask={(taskId) => {
            dispatch({ type: 'REMOVE_TODO', payload: { id: taskId } });
          }}
        />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
