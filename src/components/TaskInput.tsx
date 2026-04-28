import { useState } from "react";
import type { Priority } from "../domain/Priority";
import type { Task } from "../domain/Task";
import type { TaskType } from "../domain/TaskType";
import PrioritySelector from "./PrioritySelector";
import TypeSelector from "./TypeSelector";

export type NewTask = Omit<Task, "id">;

type TaskInputProps = {
  placeholder?: string;
  priority?: Priority;
  taskType?: TaskType;
  onAdd?: (task: NewTask) => void;
  className?: string;
};

const TaskInput = ({
  priority = "Medium",
  taskType = "General",
  onAdd,
  placeholder = "What needs to be done?",
  className = "",
}: TaskInputProps) => {
  const [task, setTask] = useState<NewTask>({
    title: "",
    priority: priority,
    type: taskType,
    isComplete: false,
  });

  const handleChange = (name: string, value: string) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    const trimmedTitle = task.title.trim();
    if (!trimmedTitle) return;

    const newTask = { ...task, title: trimmedTitle };

    onAdd?.(newTask);

    setTask((prevTask) => ({ ...prevTask, title: "" }));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={`border border-gray-800 hover:border-gray-600
      hover:bg-gray-800 rounded-xl p-2 transition-colors ${className}
      flex flex-wrap gap-2`}
    >
      <input
        className="p-2 flex-1 text-white placeholder-gray-500"
        type="text"
        name="title"
        value={task.title}
        placeholder={placeholder}
        onChange={(e) =>{  handleChange(e.target.name, e.target.value); }}
      />

      <div className="flex gap-2">
        <PrioritySelector
          value={task.priority}
          onChange={(value) =>{  handleChange("priority", value); }}
        />

        <TypeSelector value={task.type} onChange={(value) =>{  handleChange("type", value); }} />

        <button
          disabled={!task.title}
          type="submit"
          className="inline-flex items-center gap-2 px-8 rounded-xl 
        enabled:bg-indigo-900 disabled:bg-indigo-900/50
        disabled:cursor-not-allowed"
        >
          <span>+</span>
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
