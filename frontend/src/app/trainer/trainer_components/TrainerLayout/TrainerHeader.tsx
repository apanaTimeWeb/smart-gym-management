'use client';
// RESPONSIBILITY: Renders the fixed Trainer shell header: sidebar toggle, page title, theme toggle, notification navigation, and accessible profile menu. It owns no feature/business data.
import { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TrainerPageUrlConfig } from '@/app/trainer/trainer_url_config';
import type { TrainerHeaderProps } from '@/app/trainer/trainer_components/TrainerLayout/TrainerLayoutTypes';

export default function TrainerHeader({ title, subtitle }: TrainerHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileTriggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const user = getUser();

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showProfile) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowProfile(false);
        profileTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [showProfile]);

  return (
    <header className="bg-header border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex flex-wrap items-center gap-4 min-w-0">
        <button
          type="button"
          data-trainer-sidebar-toggle
          aria-label="Toggle navigation sidebar"
          title="Toggle navigation sidebar"
          className="min-w-11 min-h-11 inline-flex items-center justify-center -ml-3 text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-page rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
        >
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-primary truncate">{title}</h1>
          {subtitle && <p className="text-sm text-secondary mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <ThemeToggle />
        <Link
          href={TrainerPageUrlConfig.NOTIFICATIONS}
          aria-label="Open notifications"
          className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-md border border-transparent text-secondary hover:text-primary hover:bg-input hover:border-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
        </Link>

        <div className="relative" ref={profileRef}>
          <button
            ref={profileTriggerRef}
            type="button"
            aria-label="Open profile menu"
            aria-expanded={showProfile}
            aria-haspopup="menu"
            onClick={() => setShowProfile((value) => !value)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-primary text-sm font-bold motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </button>

          {showProfile && (
            <div
              role="menu"
              aria-label="Profile menu"
              className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30"
            >
              <div className="px-4 py-3 border-b border-border bg-header">
                <p className="text-sm font-semibold text-primary truncate">{mounted ? (user?.name || 'Trainer') : 'Trainer'}</p>
                <p className="text-xs text-secondary truncate">{mounted ? (user?.email || '') : ''}</p>
                {mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}
              </div>
              <div className="py-1">
                <Link
                  role="menuitem"
                  href={TrainerPageUrlConfig.PROFILE}
                  className="flex items-center gap-2 min-h-11 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-input"
                  onClick={() => setShowProfile(false)}
                >
                  <User size={18} strokeWidth={2} aria-hidden="true" /> My Profile
                </Link>
              </div>
              <div className="border-t border-border py-1 bg-header">
                <button
                  type="button"
                  role="menuitem"
                  className="w-full flex items-center gap-2 min-h-11 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-danger-bg"
                  onClick={() => { setShowProfile(false); logout(); }}
                >
                  <LogOut size={18} strokeWidth={2} aria-hidden="true" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
