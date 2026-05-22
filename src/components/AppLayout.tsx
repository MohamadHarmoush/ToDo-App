import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import { MdHome } from '@react-icons/all-files/md/MdHome';
import { MdInfo } from '@react-icons/all-files/md/MdInfo';
import { MdList } from '@react-icons/all-files/md/MdList';
import type { ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';

import { useIsMobile } from '@/hooks/useIsMobile';

import NavBar from './NavBar';

const MobileBottomNav = () => {
  const navItems = [
    { label: 'Home', link: '/', icon: MdHome },
    { label: 'Tasks', link: '/tasks', icon: MdList },
    { label: 'About', link: '/about', icon: MdInfo },
  ];

  return (
    <nav className='fixed right-0 bottom-0 left-0 border-t border-gray-700 bg-gray-800 px-4 py-2'>
      <div className='flex items-center justify-around'>
        {navItems.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <item.icon className='h-6 w-6' />
            <span className='text-xs'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

type AppHeaderProps = {
  title?: string;
};

const AppHeader = ({ title }: AppHeaderProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = isMobile && location.pathname !== '/' && location.pathname !== '/tasks';

  return (
    <header className='border-b border-gray-700 bg-gray-800/50 px-8 py-4'>
      <div className='grid grid-cols-[1fr_auto_1fr] items-center'>
        <div className='flex items-center gap-3'>
          {showBackButton && (
            <button onClick={() => navigate(-1)} aria-label='Go back'>
              <MdArrowBack className='h-5 w-5 text-white/80' />
            </button>
          )}
        </div>

        <Link to='/' className='flex justify-center'>
          <h1 className='text-xl font-bold text-white/80'>{title}</h1>
        </Link>

        <div className='flex justify-end'>
          {!isMobile && (
            <NavBar
              navItems={[
                { label: 'Home', link: '/' },
                { label: 'Tasks', link: '/tasks' },
                { label: 'About', link: '/about' },
              ]}
            />
          )}
        </div>
      </div>
    </header>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <main
      className={`mx-8 flex min-h-0 flex-1 flex-col bg-gray-900 py-6 ${isMobile ? 'pb-20' : ''}`}
    >
      {children}
    </main>
  );
};

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className='mx-auto mt-2 flex min-h-screen flex-col overflow-hidden'>
      {children}
      {isMobile && <MobileBottomNav />}
    </div>
  );
};

export { AppHeader, Content as AppContent };
export default AppLayout;
