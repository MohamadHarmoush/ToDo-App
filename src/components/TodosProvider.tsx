import { useReducer, useEffect, type ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { Task } from '@/domain/Task';
import type { TodoAction } from '@/domain/TodoAction';
import { taskReducer } from '@/utils/TaskReducer';
import { storeTasks, getStoredTasks } from '@/utils/TaskStorage';

type TodosContextValue = {
  tasks: Task[];
  dispatch: React.Dispatch<TodoAction>;
};

const TodosContext = createContext<TodosContextValue>({
  tasks: [],
  dispatch: () => {},
});

export const useTodos = () => useContext(TodosContext);

type TodosProviderProps = {
  children: ReactNode;
};

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getStoredTasks);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  return <TodosContext value={{ tasks, dispatch }}>{children}</TodosContext>;
};
