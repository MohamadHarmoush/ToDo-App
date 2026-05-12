import AppLayout from './components/AppLayout';
import PageHeader from './components/PageHeader';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { TodosProvider } from './components/TodosProvider';

const App = () => {
  return (
    <TodosProvider>
      <AppLayout>
        <AppLayout.AppHeader title='Simple Todo' />
        <AppLayout.Content>
          <PageHeader title='Focus on what matters' subtitle='Ready to organize your day?' />
          <TaskInput />
          <TaskList />
        </AppLayout.Content>
      </AppLayout>
    </TodosProvider>
  );
};

export default App;
