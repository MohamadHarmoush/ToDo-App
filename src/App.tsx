import AppLayout from "./components/AppLayout";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <AppLayout>
      <AppLayout.AppHeader title="Simple Todo" />
      <AppLayout.Content>
        <TaskList />
        <div>Test</div>
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
