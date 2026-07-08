'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, LogOut, Settings, User, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';
import { ERP_NOTIFICATIONS } from '../erp_utils/ErpSharedConstants';

import { ThemeToggle } from '@/components/ThemeToggle';

interface ErpHeaderProps {
  title: string;
  subtitle?: string;
}

export default function ErpHeader({ title, subtitle }: ErpHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const user = getUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
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
          className="p-2 -ml-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors bg-[var(--bg-input)] hover:bg-[var(--bg-page)] rounded-lg border border-[var(--border)]"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{title}</h1>
          {subtitle && <p className="text-sm text-[var(--text-secondary)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm bg-[var(--bg-input)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--border-focus)] text-[var(--text-primary)] w-52 transition-colors"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] rounded-lg transition-colors border border-transparent hover:border-[var(--border)]"
          >
 <Bell size={19} />
 <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }}></span>
 </button>

 {showNotifications && (
 <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden z-50">
 <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-header)]">
 <h3 className="font-semibold text-[var(--text-primary)]">Notifications</h3>
 <button onClick={() => setShowNotifications(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={16} /></button>
 </div>
 <div className="max-h-[300px] overflow-y-auto">
 {ERP_NOTIFICATIONS.map(n => (
 <div key={n.id} className={`px-4 py-3 border-b border-[var(--border)] hover:bg-[var(--bg-input)] transition-colors cursor-pointer ${n.unread ? 'bg-[var(--primary-subtle)]' : ''}`}>
 <p className={`text-sm ${n.unread ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}>{n.text}</p>
 <span className="text-xs text-[var(--text-secondary)] mt-1 block">{n.time}</span>
 </div>
 ))}
 </div>
 <div className="p-3 text-center border-t border-[var(--border)] bg-[var(--bg-header)]">
 <button className="text-sm font-medium hover:underline" style={{ color: 'var(--primary)' }}>View All Notifications</button>
 </div>
 </div>
 )}
 </div>

 {/* Profile */}
 <div className="relative" ref={profileRef}>
        <div
          onClick={() => setShowProfile(!showProfile)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-transform hover:scale-105 border border-white/10"
          style={{ background: 'var(--primary)' }}
        >
          {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
        </div>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-card)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-header)]">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{mounted ? (user?.name || 'Admin') : 'Admin'}</p>
              <p className="text-xs text-[var(--text-secondary)]">{mounted ? (user?.email || '') : ''}</p>
              {(mounted && user?.role) && <p className="text-xs text-[var(--warning)] font-medium mt-0.5">{user.role}</p>}
            </div>
 <div className="py-1">
 <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors" onClick={() => setShowProfile(false)}>
 <User size={15} /> My Profile
 </Link>
 <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors" onClick={() => setShowProfile(false)}>
 <Settings size={15} /> Settings
 </Link>
 </div>
 <div className="border-t border-[var(--border)] py-1 bg-[var(--bg-header)]">
 <button
 className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger-bg)] font-medium transition-colors"
 onClick={() => { setShowProfile(false); logout(); }}
 >
 <LogOut size={15} /> Log out
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 </header>
 );
}
