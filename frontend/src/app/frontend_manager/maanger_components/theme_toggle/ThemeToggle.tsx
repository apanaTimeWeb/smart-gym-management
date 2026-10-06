// RESPONSIBILITY: Zero-business global control for switching the application's semantic light/dark theme.
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * @description Provides a zero-business global theme switcher backed by next-themes. It only changes the application's theme preference and never owns feature or API state.
 * @dependencies Uses next-themes and lucide-react plus React mount state to avoid hydration mismatches.
 * @edge-case Renders a stable disabled control until the client has mounted, then toggles between the documented light and dark themes without introducing feature-specific styling.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // EFFECT: Waits for client mount before reading/toggling the resolved theme to avoid hydration mismatch.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const label = mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle color theme';

  return (
    <button
      type="button"
      data-testid="ui-theme-toggle"
      aria-label={label}
      aria-pressed={mounted ? isDark : undefined}
      disabled={!mounted}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="min-h-11 min-w-11 rounded-lg border border-transparent p-2 text-secondary hover:border-border hover:bg-input hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDark ? <Sun size={18} strokeWidth={2} aria-hidden="true" /> : <Moon size={18} strokeWidth={2} aria-hidden="true" />}
    </button>
  );
}
