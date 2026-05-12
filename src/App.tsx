import { Route, Routes } from 'react-router';

import AppLayout from './components/AppLayout';
import AboutPage from './pages/about';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import TasksPage from './pages/tasks';

const App = () => {
  return (
    <AppLayout>
      <AppLayout.AppHeader title='Simple Todo' />
      <AppLayout.Content>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AppLayout.Content>
    </AppLayout>
  );
};

export default App;
