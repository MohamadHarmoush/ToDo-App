import { useEffect, useRef, useState } from "react";
import AppLayout from "./components/AppLayout";
import TaskList from "./components/TaskList";
import PageHeader from "./components/PageHeader";
import TaskInput, { type NewTask } from "./components/TaskInput";
import type { Task } from "./domain/Task";

const TASKS_KEY = "tasks";
const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_KEY);
  if (!storedTasks) return [];
  return JSON.parse(storedTasks) || [];
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);
  const nextTaskIdRef = useRef(
    tasks.reduce((maxTaskId, task) => Math.max(maxTaskId, task.id), 0) + 1,
  );

  const handleAddTask = (newTask: NewTask) => {
    setTasks((prevTasks) => {
      const addedTask = {
        ...newTask,
        id: nextTaskIdRef.current++,
      };

      return [...prevTasks, addedTask];
    });
  };

  const handleTaskChange = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleRemoveTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AppLayout>
      <AppLayout.AppHeader title="Simple Todo" />
      <AppLayout.Content>
        <PageHeader title="Focus on what matters" subtitle="Ready to organize your day?" />
        <TaskInput onAdd={handleAddTask} />
        <TaskList tasks={tasks} onTaskChange={handleTaskChange} onRemoveTask={handleRemoveTask} />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
