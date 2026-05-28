import { useAtomValue } from 'jotai';
import { useLayoutEffect } from 'react';

import { themeAtom } from '@/store/themeStore';

export const useSyncTheme = () => {
  const theme = useAtomValue(themeAtom);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
};
