import { getPriorityColor } from "../domain/Priority";
import type { Task } from "../domain/Task";
import { getTaskTypeColor } from "../domain/TaskType";
import { Badge } from "./Badge";
import { RemoveIcon } from "./RemoveIcon";

type Props = {
  task: Task;
  className?: string;
  onUpdate: (task: Task) => void;
  onRemove: (taskId: number) => void;
};

export const TaskItem = ({ task, className, onUpdate, onRemove }: Props) => {
  const priorityColor = getPriorityColor(task.priority);
  const typeColor = getTaskTypeColor(task.type);

  const handleOnCheckClick = (value: boolean) => {
    onUpdate({ ...task, isComplete: value });
  };

  const taskTitleClassName = task.isComplete ? "line-through text-gray-400" : "";

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
        <h1 className={`${taskTitleClassName} w-full`}>{task.title}</h1>
        <button
          onClick={() => onRemove(task.id)}
          className="p-1 text-white bg-red-800 rounded-lg hover:bg-red-300/80 transition-colors"
        >
          <RemoveIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <Badge label={task.priority} textColor={priorityColor} />
        <Badge label={task.type} textColor={typeColor} />
      </div>
      <textarea
        className="w-full bg-gray-800 rounded-lg outline-none p-2 text-xs"
        placeholder="Add notes..."
        rows={4}
        value={task.notes}
        onChange={(e) => onUpdate({ ...task, notes: e.target.value })}
      />
    </div>
  );
};
