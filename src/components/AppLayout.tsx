import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import { MdHome } from '@react-icons/all-files/md/MdHome';
import { MdInfo } from '@react-icons/all-files/md/MdInfo';
import { MdList } from '@react-icons/all-files/md/MdList';
import { useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';

import NavBar from './NavBar';
import { ThemeToggle } from './ThemeToggle';
import { TransitionLink } from './TransitionLink';

const navItems = [
  { label: 'Home', link: '/', icon: MdHome },
  { label: 'Tasks', link: '/tasks', icon: MdList },
  { label: 'About', link: '/about', icon: MdInfo },
];

type AppHeaderProps = {
  title?: string;
};

const AppHeader = ({ title }: AppHeaderProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useViewTransitionNavigate('backwards');
  const [menuOpen, setMenuOpen] = useState(false);

  const showBackButton = isMobile && location.pathname !== '/' && location.pathname !== '/tasks';

  return (
    <>
      <header className='appHeader sticky top-0 z-50 border-b border-gray-200 bg-white px-8 py-4 transition-colors dark:border-gray-700 dark:bg-gray-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {showBackButton && (
              <button onClick={() => navigate(-1)} aria-label='Go back'>
                <MdArrowBack className='h-5 w-5 text-slate-600 dark:text-white/80' />
              </button>
            )}
            <TransitionLink to='/'>
              <h1 className='text-xl font-bold text-slate-800 dark:text-white/80'>{title}</h1>
            </TransitionLink>
          </div>

          {!isMobile && (
            <div className='flex items-center gap-4'>
              <NavBar navItems={navItems.map(({ label, link }) => ({ label, link }))} />
              <ThemeToggle />
            </div>
          )}

          {isMobile && (
            <div className='flex items-center gap-2'>
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className='flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              >
                {menuOpen ? (
                  <MdClose className='h-6 w-6 text-slate-600 dark:text-white/80' />
                ) : (
                  <GiHamburgerMenu className='h-6 w-6 text-slate-600 dark:text-white/80' />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobile && menuOpen && (
          <nav className='absolute top-full right-0 left-0 border-b border-gray-200 bg-white shadow-lg transition-colors dark:border-gray-700 dark:bg-gray-800'>
            {navItems.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-8 py-3 hover:bg-gray-300 dark:hover:bg-slate-700 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'
                  }`
                }
              >
                <item.icon className='h-5 w-5' />
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Backdrop overlay - blocks clicks on content below when menu is open */}
      {isMobile && menuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50'
          onClick={() => setMenuOpen(false)}
          aria-hidden='true'
        />
      )}
    </>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <main
      className={`mx-8 flex min-h-0 flex-1 flex-col bg-slate-50 py-6 transition-colors dark:bg-gray-900 ${isMobile ? 'pb-20' : ''}`}
    >
      {children}
    </main>
  );
};

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50 transition-colors dark:bg-gray-900'>
      {children}
    </div>
  );
};

export { AppHeader, Content as AppContent };
export default AppLayout;
