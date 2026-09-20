'use client';
// RESPONSIBILITY: Renders the fixed top navigation bar — page title, global search, theme toggle, notifications dropdown, and user profile dropdown. No API calls.
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Settings, User, Menu, QrCode } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MANAGER_HEADER_NAVIGATION } from '@/app/manager/manager_navigation/ManagerHeaderNavigationConfig';
import type { ManagerHeaderProps } from '@/app/manager/manager_components/ManagerLayout/ManagerLayoutTypes';

export default function ManagerHeader({ title, subtitle, action }: ManagerHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const user = getUser();

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Attaches click-outside listener once on mount to close notification/profile dropdowns on outside click.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-header/95 backdrop-blur-md border-b border-border px-4 lg:px-6 flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4 flex-1">
        <button
          aria-label="Toggle Sidebar"
          className="min-h-11 min-w-11 p-2 -ml-3 text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-page rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-page-title font-bold text-primary">{title}</h1>
          {subtitle && <p className="text-sm text-secondary mt-0.5">{subtitle}</p>}
        </div>
        
        {action && (
          <div className="hidden sm:block ml-4 pl-4 border-l border-border">
            <button 
              onClick={action.onClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-on-primary hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {action.icon}
              {action.label}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4">


        {/* QR Scanner Mode (Kiosk) — visible on all breakpoints (Rule 64) */}
        <button
          onClick={() => router.push(MANAGER_HEADER_NAVIGATION.scanner)}
          aria-label="Open QR Scanner kiosk mode"
          className="min-h-11 min-w-11 p-2 text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors border border-transparent hover:border-border flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <QrCode size={18} />
          <span className="hidden sm:inline text-sm font-medium">Scanner</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications — navigation only; notification business data belongs to the Notifications feature. */}
        <Link
          href={MANAGER_HEADER_NAVIGATION.notifications}
          aria-label="Open notifications"
          className="relative min-h-11 min-w-11 p-2 text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors border border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Bell size={18} aria-hidden="true" />
        </Link>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Toggle profile menu"
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-card border border-border overflow-hidden z-30">
              <div className="px-4 py-3 border-b border-border bg-overlay">
                <p className="text-sm font-semibold text-primary">{mounted ? (user?.name || 'Manager') : 'Manager'}</p>
                <p className="text-xs text-secondary">{mounted ? (user?.email || '') : ''}</p>
                {(mounted && user?.role) && <p className="text-xs text-warning font-medium mt-0.5">{user.role}</p>}
              </div>
              <div className="py-1">
                <Link href={MANAGER_HEADER_NAVIGATION.profile} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors" onClick={() => setShowProfile(false)}>
                  <User size={18} /> My Profile
                </Link>
                <Link href={MANAGER_HEADER_NAVIGATION.settings} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors" onClick={() => setShowProfile(false)}>
                  <Settings size={18} /> Settings
                </Link>
              </div>
              <div className="border-t border-border py-1 bg-overlay">
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger font-medium motion-safe:transition-colors"
                  onClick={() => { setShowProfile(false); logout(); }}
                >
                  <LogOut size={18} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
