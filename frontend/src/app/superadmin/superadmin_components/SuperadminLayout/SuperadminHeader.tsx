'use client';
// RESPONSIBILITY: SuperadminHeader.tsx renders the top navigation bar for the SaaS module, handling search, theme toggling, and profile actions.

import { useState, useRef, useEffect } from 'react';
import { Search, LogOut, Settings, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { logout } from '@/lib/api';

export default function SuperadminHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Sets mounted=true once on client-side hydration to enable ThemeToggle to render safely without SSR mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Attaches a global mousedown listener once on mount to close the profile dropdown when clicking outside.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-3 text-secondary hover:text-foreground transition-colors bg-input hover:bg-background rounded-lg border border-border"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">SaaS Platform</h1>
          <p className="text-sm text-secondary mt-0.5">Master Control Panel</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">


        {/* Theme Toggle - This ensures Dark/Light Mode is accessible! */}
        <ThemeToggle />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-transform hover:scale-105 shadow-lg bg-primary"
          >
            SA
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-2xl border border-border overflow-hidden z-30">
              <div className="px-4 py-3 border-b border-border bg-header">
                <p className="text-sm font-semibold text-foreground">Superadmin</p>
                <p className="text-xs text-secondary">admin@gymsmart.com</p>
                <p className="text-xs text-warning font-medium mt-0.5">GOD MODE</p>
              </div>
              <div className="py-1">
                <Link href={SuperadminUrlConfig.PAGES.SETTINGS} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-foreground hover:bg-input transition-colors" onClick={() => setShowProfile(false)}>
                  <Settings size={15} /> Platform Settings
                </Link>
              </div>
              <div className="border-t border-border py-1 bg-header">
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-danger-bg font-medium transition-colors"
                  onClick={async () => {
                    setShowProfile(false);
                    await logout();
                  }}
                >
                  <LogOut size={15} /> Exit SaaS Panel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

