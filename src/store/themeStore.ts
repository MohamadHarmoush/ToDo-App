import { atomWithStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light';

// Atom with localStorage persistence - defaults to 'light'
export const themeAtom = atomWithStorage<Theme>('theme', 'light');
