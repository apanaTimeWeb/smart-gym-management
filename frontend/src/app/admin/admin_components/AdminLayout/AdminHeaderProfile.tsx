'use client';

import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';

export function AdminHeaderProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const user = getUser();

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
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer motion-safe:transition-transform hover:scale-105 border border-primary/30 bg-primary"
        aria-label="Profile menu"
      >
        {mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}
      </button>
      {showProfile && (
        <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-2xl border border-border overflow-hidden z-30">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">{mounted ? (user?.name ?? 'Admin') : 'Admin'}</p>
            <p className="text-xs text-secondary">{mounted ? (user?.email ?? '') : ''}</p>
            {mounted && user?.role && <p className="text-xs text-warning font-medium mt-0.5">{user.role}</p>}
          </div>
          <div className="py-1">
            <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors" onClick={() => setShowProfile(false)}>
              <User size={15} /> My Profile
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors" onClick={() => setShowProfile(false)}>
              <Settings size={15} /> Settings
            </Link>
          </div>
          <div className="border-t border-border py-1">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors" onClick={() => { setShowProfile(false); logout(); }}>
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
