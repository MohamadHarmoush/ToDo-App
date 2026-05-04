import { useReducer, useEffect, type ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { Task } from '@/domain/Task';
import type { TodoAction } from '@/domain/TodoAction';
import { storeTasks, getStoredTasks } from '@/utils/TaskStorage';

const TodosContext = createContext<Task[]>([]);
const TodosDispatchContext = createContext<React.Dispatch<TodoAction>>(() => {
  // No-op default dispatch
});

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);

const taskReducer = (prevState: Task[], action: TodoAction): Task[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...prevState, action.payload];
    case 'UPDATE_TODO':
      return prevState.map((task: Task) => (task.id === action.payload.id ? action.payload : task));
    case 'REMOVE_TODO':
      return prevState.filter((task: Task) => task.id !== action.payload.id);
    default:
      return prevState;
  }
};

type TodosProviderProps = {
  children: ReactNode;
};

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getStoredTasks);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  return (
    <TodosContext value={tasks}>
      <TodosDispatchContext value={dispatch}>{children}</TodosDispatchContext>
    </TodosContext>
  );
};
