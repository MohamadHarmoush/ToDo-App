import { useState, useCallback, type KeyboardEvent, type ChangeEvent } from "react";
import type { Priority } from "../domain/Priority";
import type { Task } from "../domain/Task";
import type { TaskType } from "../domain/TaskType";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
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
        onChange={handleChange}
      />
      <select
        value={"op1"}
        className={`
      rounded-xl outline-none
      bg-gray-600/30 mx-2 px-2 afer:${" "}
      `}
      >
        <option key={"op1"} value={"op1"}>
          Low
        </option>
        <option key={"op2"} value={"op2"}>
          Medium
        </option>
        <option key={"op3"} value={"op3"}>
          High
        </option>
      </select>
    </div>
  );
};

export default TaskInput;
