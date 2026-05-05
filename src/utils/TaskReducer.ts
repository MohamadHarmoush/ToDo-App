import type { Task } from "@/domain/Task";
import type { TodoAction } from "@/domain/TodoAction";

export const taskReducer = (prevState: Task[], action: TodoAction): Task[] => {
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
