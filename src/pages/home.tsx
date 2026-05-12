import AppLayout from '@/components/AppLayout';
import PageHeader from '@/components/PageHeader';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';

const HomePage = () => {
  return (
    <AppLayout.Content>
      <PageHeader title='Focus on what matters' subtitle='Ready to organize your day?' />
      <TaskInput />
      <TaskList />
    </AppLayout.Content>
  );
};

export default HomePage;
