import type { Task } from "../domain/Task";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onTaskChange: (task: Task) => void;
};

const TaskList = ({ tasks, onTaskChange }: TaskListProps) => {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <h1>we've {tasks.length} added.</h1>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onChange={onTaskChange} />
      ))}
    </div>
  );
};

export default TaskList;
