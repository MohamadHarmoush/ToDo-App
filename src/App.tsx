import { Route, Routes } from 'react-router';

import AboutPage from './pages/about';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import TasksPage from './pages/tasks';
import AppLayout, { AppContent, AppHeader } from './components/AppLayout';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/tasks', element: <TasksPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '*', element: <NotFoundPage /> },
];

const App = () => (
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

export default App;
