import AppLayout from "./components/AppLayout";
import TaskList from "./components/TaskList";
import PageHeader from "./components/PageHeader";
import TaskInput from "./components/TaskInput";

const App = () => {
  return (
    <AppLayout>
      <AppLayout.AppHeader title="Simple Todo" />
      <AppLayout.Content>
        <PageHeader title="Focus on what matters" subtitle="Ready to organize your day?" />
        <TaskInput />
        <TaskList />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
