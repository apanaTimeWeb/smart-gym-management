"use client";
// RESPONSIBILITY: Renders shell account controls using global auth only; it does not import business profile/settings modules.
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';
import type { AdminLayoutHeaderProfileProps } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';


/**
 * @description AdminLayoutHeaderProfile renders the shell account menu and delegates identity/session ownership to global authentication infrastructure.
 * @dependencies Consumes global auth APIs plus route values supplied by the shell; no business module dependency is allowed here.
 * @edge-case Handles hydration safely and closes the menu on outside pointer interaction.
 */
export default function AdminLayoutHeaderProfile({ profileHref, settingsHref }: AdminLayoutHeaderProfileProps) {
  const t = useTranslations(); const [showProfile, setShowProfile] = useState(false); const [mounted, setMounted] = useState(false); const profileRef = useRef<HTMLDivElement>(null); const user = getUser();
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { const handleClickOutside = (event: MouseEvent) => { if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false); }; document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);
  return <div className="relative" ref={profileRef}>
    <button type="button" onClick={() => setShowProfile((value) => !value)} className="min-h-11 min-w-11 w-9 h-9 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('admin_layout.AdminLayoutHeaderProfile.text_45a612f7ef')} data-testid="admin_layout-admin-header-profile-control">{mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}</button>
    {showProfile && <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
      <div className="px-4 py-3 border-b border-border"><p className="text-sm font-semibold text-primary">{mounted ? (user?.name ?? t('admin_layout.AdminLayoutHeaderProfile.unknownUser')) : t('admin_layout.AdminLayoutHeaderProfile.unknownUser')}</p><p className="text-xs text-secondary">{mounted ? (user?.email ?? '') : ''}</p>{mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}</div>
      <div className="py-1"><Link href={profileHref} onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_layout-admin-header-profile-control-2"><User size={18} aria-hidden="true"  strokeWidth={2}/> {t('admin_layout.AdminLayoutHeaderProfile.text_9ba8d391c5')}</Link><Link href={settingsHref} onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_layout-admin-header-profile-control-3"><Settings size={18} aria-hidden="true"  strokeWidth={2}/> {t('admin_layout.AdminLayoutHeaderProfile.text_c7f73bb54d')}</Link></div>
      <div className="border-t border-border py-1"><button type="button" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" onClick={() => { setShowProfile(false); logout(); }} data-testid="admin_layout-admin-header-profile-control-4"><LogOut size={18} aria-hidden="true"  strokeWidth={2}/> {t('admin_layout.AdminLayoutHeaderProfile.text_6e78c91f5a')}</button></div>
    </div>}
  </div>;
}
