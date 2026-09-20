// RESPONSIBILITY: Renders the fixed Superadmin header, responsive navigation trigger, notification link, theme toggle, and profile menu. No business API calls.
'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, Loader2, LogOut, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { logout } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import type { SuperadminHeaderProps } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminHeaderTypes';

export default function SuperadminHeader({ isCollapsed }: SuperadminHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileTriggerRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // EFFECT INTENT: waits for client hydration before rendering the theme control to avoid server/client theme mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // EFFECT INTENT: closes the profile popover on outside pointer interaction and returns focus to the trigger when dismissed by Escape.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !showProfile) return;
      event.preventDefault();
      setShowProfile(false);
      profileTriggerRef.current?.focus();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showProfile]);

  // EFFECT INTENT: places keyboard focus inside the opened profile menu so keyboard users do not have to tab through the page shell again.
  useEffect(() => {
    if (!showProfile) return undefined;
    const firstMenuItem = profileMenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    firstMenuItem?.focus();
    return undefined;
  }, [showProfile]);

  const handleToggleSidebar = () => window.dispatchEvent(new Event('toggle-sidebar'));
  const handleToggleProfile = () => setShowProfile((value) => !value);
  const handleCloseProfile = () => setShowProfile(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    handleCloseProfile();
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-20 flex min-h-16 items-center justify-between border-b border-border bg-header px-6 py-3 backdrop-blur-md motion-safe:transition-[padding] motion-safe:duration-slow ${isCollapsed ? 'md:pl-16 xl:pl-16' : 'md:pl-16 xl:pl-60'}`}>
      <div className="flex min-w-0 items-center gap-4">
        <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-page hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page md:hidden" onClick={handleToggleSidebar} aria-label="Toggle Sidebar" title="Toggle Sidebar"><Menu size={18} aria-hidden="true" /></button>
        <div className="min-w-0"><h1 className="truncate text-xl font-bold text-primary">SaaS Platform</h1><p className="truncate text-sm text-secondary">Master Control Panel</p></div>
      </div>

      <div className="flex items-center gap-3">
        <Link href={`${MessagingUrlConfig.PAGES.MAIN}?tab=notifications`} aria-label="Open notifications" title="Notifications" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-page hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><Bell size={18} aria-hidden="true" /></Link>
        {mounted ? <ThemeToggle /> : null}

        <div className="relative" ref={profileRef}>
          <button ref={profileTriggerRef} type="button" onClick={handleToggleProfile} aria-label="Open profile menu" aria-expanded={showProfile} aria-haspopup="menu" className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-card motion-safe:transition-transform motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">SA</button>
          {showProfile ? <div ref={profileMenuRef} role="menu" aria-label="Profile menu" className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover shadow-popover motion-safe:animate-superadmin-fade-in-up">
            <div className="border-b border-border bg-header px-4 py-3"><p className="text-sm font-semibold text-primary">Superadmin</p><p className="mt-0.5 text-xs text-secondary">Platform administrator</p></div>
            <div className="py-1"><Link href={SettingsUrlConfig.PAGES.MAIN} role="menuitem" tabIndex={0} className="flex min-h-11 items-center gap-2 px-4 py-2 text-sm text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" onClick={handleCloseProfile}><Settings size={18} aria-hidden="true" />Platform Settings</Link></div>
            <div className="border-t border-border bg-header py-1"><button type="button" role="menuitem" disabled={isLoggingOut} className="flex min-h-11 w-full items-center gap-2 px-4 py-2 text-sm font-medium text-danger hover:bg-danger-bg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50" onClick={() => void handleLogout()}>{isLoggingOut ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <LogOut size={18} aria-hidden="true" />}{isLoggingOut ? 'Signing out...' : 'Exit SaaS Panel'}</button></div>
          </div> : null}
        </div>
      </div>
    </header>
  );
}
