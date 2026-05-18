import { AppContent } from '@/components/AppLayout';
import PageHeader from '@/components/PageHeader';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

const HomePage = () => (
  <AppContent>
    <PageHeader title='Focus on what matters' subtitle='Ready to organize your day?' />
    <TaskForm />
    <TaskList />
  </AppContent>
);

export default HomePage;
