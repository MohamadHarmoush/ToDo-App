import { useState } from "react";
import AppLayout from "./components/AppLayout";
import TaskList from "./components/TaskList";
import PageHeader from "./components/PageHeader";
import TaskInput from "./components/TaskInput";
import type { Task } from "./domain/Task";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <AppLayout>
      <AppLayout.AppHeader title="Simple Todo" />
      <AppLayout.Content>
        <PageHeader title="Focus on what matters" subtitle="Ready to organize your day?" />
        <TaskInput onAdd={handleAddTask} />
        <TaskList tasks={tasks} />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
