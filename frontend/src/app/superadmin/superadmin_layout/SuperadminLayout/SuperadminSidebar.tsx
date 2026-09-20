// RESPONSIBILITY: Renders the responsive Superadmin sidebar, desktop collapse mode, mobile drawer, navigation search, and logout control.
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Gauge, Loader2, LogOut, Search, X } from 'lucide-react';
import { SuperadminNavigationConfig } from '@/app/superadmin/superadmin_layout/SuperadminLayout/superadmin_navigation_config';
import { logout } from '@/lib/api';
import SuperadminSidebarNavSection from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebarNavSection';
import type { SuperadminSidebarProps } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebarTypes';

const ALL_NAV_GROUPS = SuperadminNavigationConfig;

export default function SuperadminSidebar({ isCollapsed, setIsCollapsed }: SuperadminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isWideViewport, setIsWideViewport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileRestoreFocusRef = useRef<HTMLElement | null>(null);

  // EFFECT INTENT: tracks the design-system desktop breakpoint (1280px) so tablet navigation remains icon-only without requiring a user toggle.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const handleViewportChange = () => setIsWideViewport(mediaQuery.matches);
    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  // EFFECT INTENT: listens for the header menu event and applies the design-system mobile breakpoint (<768px) or desktop/tablet collapse behavior.
  useEffect(() => {
    const handleToggleSidebar = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen((value) => !value);
        return;
      }
      setIsCollapsed((value) => !value);
    };
    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    return () => window.removeEventListener('toggle-sidebar', handleToggleSidebar);
  }, [setIsCollapsed]);

  // EFFECT INTENT: manages focus trap, Escape dismissal, focus restoration, and body scroll lock for the mobile navigation drawer.
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    mobileRestoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    mobileCloseButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleDrawerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const drawer = document.getElementById('superadmin-sidebar-drawer');
      if (!drawer) return;
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', handleDrawerKeyDown);
    return () => {
      window.removeEventListener('keydown', handleDrawerKeyDown);
      document.body.style.overflow = previousOverflow;
      mobileRestoreFocusRef.current?.focus();
    };
  }, [isMobileOpen]);

  const showNavigationLabels = isMobileOpen || (isWideViewport && !isCollapsed);
  const navigationIsCollapsed = !showNavigationLabels;

  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return ALL_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    return ALL_NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.name.toLowerCase().includes(lowerQuery)),
    })).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCloseMobileDrawer = () => setIsMobileOpen(false);

  return (
    <>
      {isMobileOpen ? <div className="fixed inset-0 z-30 bg-overlay backdrop-blur-sm motion-safe:transition-opacity md:hidden" onClick={handleCloseMobileDrawer} aria-hidden="true" /> : null}
      <aside id="superadmin-sidebar-drawer" className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-sidebar motion-safe:transition-[width,transform] motion-safe:duration-slow md:z-10 md:w-16 md:translate-x-0 ${isCollapsed ? 'xl:w-16' : 'xl:w-60'} ${isMobileOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full md:translate-x-0'}`} aria-label="Superadmin navigation" aria-modal={isMobileOpen ? true : undefined} role={isMobileOpen ? 'dialog' : undefined}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          {showNavigationLabels ? <div className="flex items-center gap-2"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-subtle"><Gauge size={18} className="text-primary" aria-hidden="true" /></div><div><span className="block text-base font-bold leading-tight text-primary">GymSmart 360</span><span className="text-xs leading-none text-secondary">SuperAdmin</span></div></div> : <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary-subtle"><Gauge size={18} className="text-primary" aria-hidden="true" /></div>}
          {isMobileOpen ? <button ref={mobileCloseButtonRef} type="button" onClick={handleCloseMobileDrawer} aria-label="Close navigation" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page md:hidden"><X size={18} aria-hidden="true" /></button> : null}
        </div>

        <div className="hidden items-center justify-end border-b border-border px-4 py-2 xl:flex">
          <button type="button" onClick={() => setIsCollapsed((value) => !value)} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            {isCollapsed ? <ChevronRight size={18} aria-hidden="true" /> : <ChevronLeft size={18} aria-hidden="true" />}
          </button>
        </div>

        <div className="hidden shrink-0 border-b border-border px-3 py-3 xl:block">
          {isCollapsed ? <button type="button" onClick={() => setIsCollapsed(false)} aria-label="Search menu" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><Search size={18} aria-hidden="true" /></button> : <div className="relative"><Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" /><label htmlFor="superadmin-sidebar-search" className="sr-only">Search menu</label><input id="superadmin-sidebar-search" type="search" placeholder="Search menu..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="block min-h-11 w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" /></div>}
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto p-3 custom-scrollbar" aria-label="Sidebar navigation">
          <SuperadminSidebarNavSection navGroups={filteredNavGroups} isCollapsed={navigationIsCollapsed} />
        </nav>

        <div className="shrink-0 border-t border-border p-3">
          <button type="button" onClick={() => void handleLogout()} disabled={isLoggingOut} aria-label="Logout from SaaS Panel" className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-secondary hover:bg-danger-bg hover:text-danger motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger disabled:cursor-not-allowed disabled:opacity-50 ${navigationIsCollapsed ? 'justify-center' : ''}`}>
            {isLoggingOut ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <LogOut size={18} aria-hidden="true" />}
            <span className={navigationIsCollapsed ? 'sr-only' : 'text-sm font-medium'}>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
