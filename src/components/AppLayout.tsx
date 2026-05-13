import type { ReactNode } from 'react';
import { Link } from 'react-router';

import NavBar from './NavBar';

type AppHeaderProps = {
  title?: string;
};

const AppHeader = ({ title }: AppHeaderProps) => (
  <Link to='/'>
    <header className='border-b border-gray-700 bg-gray-800/50 px-8 py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold text-white/80'>{title}</h1>

        <NavBar
          navItems={[
            { label: 'Home', link: '/' },
            { label: 'Tasks', link: '/tasks' },
            { label: 'About', link: '/about' },
          ]}
        />
      </div>
    </header>
  </Link>
);

const Content = ({ children }: { children: ReactNode }) => (
  <main className='mx-8 flex min-h-0 flex-1 flex-col bg-gray-900 py-6'>{children}</main>
);

const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className='mx-auto mt-2 flex min-h-screen flex-col overflow-hidden'>{children}</div>
);

export { AppHeader, Content as AppContent };
export default AppLayout;
