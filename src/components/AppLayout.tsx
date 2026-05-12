import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import NavBar from './NavBar';

type AppHeaderProps = {
  title?: string;
};

const AppHeader = ({ title }: AppHeaderProps) => (
  <header className='border-b border-gray-700 bg-gray-800/50 px-8 py-4'>
    <div className='flex items-center justify-between'>
      <h1 className='text-xl font-bold text-white/80'>{title}</h1>

      <NavBar/>
    </div>
  </header>
);

const Content = ({ children }: { children: ReactNode }) => (
  <main className='m-8 flex min-h-0 flex-1 flex-col bg-gray-900 py-6'>{children}</main>
);

const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className='mx-auto mt-2 flex min-h-screen flex-col overflow-hidden'>{children}</div>
);

AppLayout.AppHeader = AppHeader;
AppLayout.Content = Content;

export default AppLayout;
