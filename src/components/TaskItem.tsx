import { getPriorityColor } from "../domain/Priority";
import type { Task } from "../domain/Task";
import { getTaskTypeColor } from "../domain/TaskType";
import { Badge } from "./Badge";

type Props = {
  task: Task;
  className?: string;
  onChange: (task: Task) => void;
};

export const TaskItem = ({ task, className, onChange }: Props) => {
  const priorityColor = getPriorityColor(task.priority);
  const typeColor = getTaskTypeColor(task.type);

  const handleOnCheckClick = (value: boolean) => {
    onChange({ ...task, isComplete: value });
  };

  const itemTextClass = task.isComplete ? "line-through text-gray-400" : "";

  return (
    <div className={`bg-gray-800/50 px-4 pt-2 pb-4 rounded-xl flex flex-col gap-2 ${className}`}>
      <div className="flex gap-4">
        <input
          type="checkbox"
          id={`task-complete-${task.id}`}
          checked={task.isComplete}
          onChange={(e) => handleOnCheckClick(e.target.checked)}
          className="w-4 h-4 mt-1"
        />
        <h1 className={itemTextClass}>{task.title}</h1>
      </div>
      <div className="flex flex-row gap-2">
        <Badge label={task.priority} textColor={priorityColor} />
        <Badge label={task.type} textColor={typeColor} />
      </div>
    </div>
  );
};
