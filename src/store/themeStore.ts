import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light';

// Atom with localStorage persistence - defaults to 'light'
const themeAtomBase = atomWithStorage<Theme>('theme', 'light');

export const themeAtom = atom(
  (get) => get(themeAtomBase),
  (_get, set, newTheme: Theme) => {
    set(themeAtomBase, newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  },
);

// Initialize theme on app load
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  const theme = savedTheme || 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
  return theme;
};
