"use client";
// RESPONSIBILITY: Renders/orchestrates AdminHeaderProfile for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';
import { AdminProfileUrlConfig } from '@/app/admin/profile/admin_profile_url_config';
import { SettingsUrlConfig } from '@/app/admin/settings/admin_settings_url_config';

export function AdminHeaderProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const user = getUser();

  // eslint-disable-next-line react-hooks/set-state-in-effect
// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/AdminLayout/AdminHeaderProfile.tsx.
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="min-h-11 min-w-11 w-9 h-9 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        aria-label="Profile menu"
      >
        {mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}
      </button>
      {showProfile && (
        <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-primary">{mounted ? (user?.name ?? 'Admin') : 'Admin'}</p>
            <p className="text-xs text-secondary">{mounted ? (user?.email ?? '') : ''}</p>
            {mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}
          </div>
          <div className="py-1">
            <Link href={AdminProfileUrlConfig.root} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base" onClick={() => setShowProfile(false)}>
              <User size={15} /> My Profile
            </Link>
            <Link href={SettingsUrlConfig.PAGES.SETTINGS} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base" onClick={() => setShowProfile(false)}>
              <Settings size={15} /> Settings
            </Link>
          </div>
          <div className="border-t border-border py-1">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => { setShowProfile(false); logout(); }}>
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
