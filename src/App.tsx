import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import AppLayout, { AppContent, AppHeader } from './components/AppLayout';
import AboutPage from './pages/about';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import TaskDetailsPage from './pages/task-details';
import TasksPage from './pages/tasks';
import { seed100Tasks } from './utils/seedTasksFromJson';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/tasks', element: <TasksPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/task/:id', element: <TaskDetailsPage /> },
  { path: '*', element: <NotFoundPage /> },
];

const App = () => {
  /*   useEffect(() => {
    const addDummyTasks = async () => {
      seed100Tasks();
    };

    addDummyTasks();
  }, []); */
  return (
    <AppLayout>
      <AppHeader title='Simple Todo' />
      <AppContent>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </AppContent>
    </AppLayout>
  );
};

export default App;
