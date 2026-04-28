import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout";
import TaskList from "./components/TaskList";
import PageHeader from "./components/PageHeader";
import TaskInput, { type NewTask } from "./components/TaskInput";
import type { Task } from "./domain/Task";

const TASKS_KEY = "tasks";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    if (!storedTasks) return [];
    return JSON.parse(storedTasks) || [];
  });

  const handleAddTask = (newTask: NewTask) => {
    setTasks((prev) => {
      const addedTask = {
        ...newTask,
        id: prev.length + 1,
      };

      return [...prev, addedTask];
    });
  };

  const handleTaskChange = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
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
        <TaskList tasks={tasks} onTaskChange={handleTaskChange} />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
