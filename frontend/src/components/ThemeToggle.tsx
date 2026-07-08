'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative p-2 text-[var(--text-secondary)] rounded-lg border border-transparent opacity-0">
        <Sun size={19} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] rounded-lg transition-colors border border-transparent hover:border-[var(--border)]"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
