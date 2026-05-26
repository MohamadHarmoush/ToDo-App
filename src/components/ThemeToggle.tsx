import { BsMoon } from '@react-icons/all-files/bs/BsMoon';
import { BsSun } from '@react-icons/all-files/bs/BsSun';
import { useAtom } from 'jotai';

import { themeAtom } from '@/store/themeStore';

export const ThemeToggle = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className='flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
    >
      {theme === 'dark' ? (
        <BsSun className='h-5 w-5 text-yellow-400' />
      ) : (
        <BsMoon className='h-5 w-5 text-slate-600' />
      )}
    </button>
  );
};
