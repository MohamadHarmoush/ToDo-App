import type { Task } from "../domain/Task";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onTaskChange: (task: Task) => void;
};

const TaskList = ({ tasks, onTaskChange }: TaskListProps) => {
  return (
    <div className="mt-8 flex flex-1 min-h-0 flex-col gap-2 overflow-y-auto pr-2">
      <h1>we've {tasks.length} added.</h1>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onChange={onTaskChange} />
      ))}
    </div>
  );
};

export default TaskList;
