import type { Task } from "../domain/Task";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onTaskChange: (task: Task) => void;
  onRemoveTask: (taskId: number) => void;
};

const TaskList = ({ tasks, onTaskChange, onRemoveTask }: TaskListProps) => {
  return (
    <div className="mt-8 flex flex-col gap-2 overflow-y-auto pr-2">
      <h1>we've tasks {tasks.length} added.</h1>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onUpdate={onTaskChange} onRemove={onRemoveTask} />
      ))}
    </div>
  );
};

export default TaskList;
