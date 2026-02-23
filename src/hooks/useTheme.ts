import { useEffect, useState } from 'react';
import { Theme } from '../settings';

/**
 * Hook to get the actual theme to apply (resolving 'system' to 'light' or 'dark')
 */
export function useTheme(themeSetting: Theme): 'light' | 'dark' {
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => {
    if (themeSetting === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeSetting;
  });

  useEffect(() => {
    if (themeSetting === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        setActualTheme(e.matches ? 'dark' : 'light');
      };

      // Initial check
      updateTheme(mediaQuery);

      // Listen for changes
      mediaQuery.addEventListener('change', updateTheme);

      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    } else {
      setActualTheme(themeSetting);
    }
  }, [themeSetting]);

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (actualTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [actualTheme]);

  return actualTheme;
}
