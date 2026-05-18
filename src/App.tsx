import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { fetchTasks } from './api';
import AppLayout, { AppContent, AppHeader } from './components/AppLayout';
import { tasksAtom } from './components/atoms';
import { TodoActions } from './domain/TodoAction';
import AboutPage from './pages/about';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import TaskDetailsPage from './pages/task-details';
import TasksPage from './pages/tasks';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/tasks', element: <TasksPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/task/:id', element: <TaskDetailsPage /> },
  { path: '*', element: <NotFoundPage /> },
];

const App = () => {
  const dispatch = useSetAtom(tasksAtom);

  // Hydrate state from backend on initial mount
  useEffect(() => {
    const syncTasksFromBackend = async () => {
      try {
        const remoteTasks = await fetchTasks();
        dispatch(TodoActions.setTasks(remoteTasks));
      } catch (error) {
        console.error('Failed to sync tasks from backend:', error);
      }
    };

    syncTasksFromBackend();
  }, [dispatch]);

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
