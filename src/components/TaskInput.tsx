import { useState, useCallback, type KeyboardEvent, type ChangeEvent } from "react";
import type { Priority } from "../domain/Priority";
import type { Task } from "../domain/Task";
import type { TaskType } from "../domain/TaskType";
import PrioritySelector from "./PrioritySelector";

interface TaskInputProps {
  placeholder?: string;
  priority?: Priority;
  taskType?: TaskType;
  onAdd?: (task: Task) => void;
  onChange?: (title: string) => void;
  className?: string;
}

const TaskInput = ({
  priority = "Medium",
  taskType = "General",
  onAdd,
  onChange,
  placeholder = "What needs to be done?",
  className = "",
}: TaskInputProps) => {
  const [task, setTask] = useState<Task>({
    title: "",
    priority: priority,
    type: taskType,
    isActive: true,
  });

  const handleChange = (name: string, value: string) => {
    setTask({
      ...task,
      [name]: value,
    });
  };

  return (
    <div
      className={`border border-gray-800 hover:border-gray-600
      hover:bg-gray-800 rounded-xl p-2 transition-colors ${className}
      flex flex-row gap-4`}
    >
      <input
        className="p-2 w-full text-white placeholder-gray-500"
        type="text"
        name="title"
        value={task.title}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <PrioritySelector
        value={task.priority}
        onChange={(value) => handleChange("priority", value)}
      />
    </div>
  );
};

export default TaskInput;
