'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, LogOut, Settings, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { LandingUrlConfig } from '@/app/(landing)/landing_url_config';

export default function SuperadminHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  return (
    <header className="bg-[var(--bg-card)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors bg-[var(--bg-input)] hover:bg-[var(--bg-page)] rounded-lg border border-[var(--border)]"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">SaaS Platform</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Master Control Panel</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search Tenants..."
            className="pl-9 pr-4 py-2 text-sm bg-[var(--bg-input)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--border-focus)] text-[var(--text-primary)] w-52 transition-colors"
          />
        </div>

        {/* Theme Toggle - This ensures Dark/Light Mode is accessible! */}
        <ThemeToggle />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-transform hover:scale-105 border border-white/10 shadow-lg shadow-purple-500/20 bg-gradient-to-br from-indigo-500 to-purple-600"
          >
            SA
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-header)]">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Superadmin</p>
                <p className="text-xs text-[var(--text-secondary)]">admin@gymsmart.com</p>
                <p className="text-xs text-[var(--warning)] font-medium mt-0.5">GOD MODE</p>
              </div>
              <div className="py-1">
                <Link href={SuperadminUrlConfig.PAGES.SETTINGS} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors" onClick={() => setShowProfile(false)}>
                  <Settings size={15} /> Platform Settings
                </Link>
              </div>
              <div className="border-t border-[var(--border)] py-1 bg-[var(--bg-header)]">
                <Link
                  href={LandingUrlConfig.PAGES.HOME}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger-bg)] font-medium transition-colors"
                  onClick={() => { setShowProfile(false); }}
                >
                  <LogOut size={15} /> Exit SaaS Panel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
