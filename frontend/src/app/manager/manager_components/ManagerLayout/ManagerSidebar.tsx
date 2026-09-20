// RESPONSIBILITY: Renders the collapsible left navigation sidebar for the Manager portal. No API calls.
'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getUser } from '@/lib/api';
import { MANAGER_NAV_GROUPS } from '@/app/manager/manager_navigation/ManagerNavigationConfig';
import type { ManagerSidebarProps } from '@/app/manager/manager_components/ManagerLayout/ManagerLayoutTypes';


export default function ManagerSidebar({ isCollapsed, setIsCollapsed }: ManagerSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const previousMobileFocusRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const user = getUser();

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Listens for the global 'toggle-sidebar' event dispatched by ManagerHeader's hamburger button.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 1024) {
        setIsMobileOpen((open) => {
          if (!open) previousMobileFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          return !open;
        });
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

  // Mobile drawer: trap focus, close on Escape, lock page scrolling, and restore focus to the trigger.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]';
    const focusFirst = () => asideRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    focusFirst();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(asideRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => previousMobileFocusRef.current?.focus());
      previousMobileFocusRef.current = null;
    };
  }, [isMobileOpen]);

  // Closes the mobile drawer whenever the route changes (user navigated to a new page).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Filter groups based on search query
  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return MANAGER_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    
    return MANAGER_NAV_GROUPS
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.label.toLowerCase().includes(lowerQuery))
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 bg-overlay-backdrop backdrop-blur-sm z-40 lg:hidden motion-safe:transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside ref={asideRef} aria-label="Manager navigation" className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-border z-40 lg:z-10 flex flex-col motion-safe:transition-all motion-safe:duration-slow ${
        isCollapsed ? 'lg:w-15' : 'lg:w-60'
      } ${
        isMobileOpen ? 'w-64 motion-safe:translate-x-0 motion-reduce:translate-x-0' : 'w-64 motion-safe:-translate-x-full motion-reduce:-translate-x-full lg:motion-safe:translate-x-0 lg:motion-reduce:translate-x-0'
      }`}>

        {/* Logo & Toggle */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt="GymSmart MANAGER" width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-slow flex flex-col">
                <span className="text-primary font-bold text-lg leading-tight tracking-tight">GymSmart</span>
                <span className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5">MANAGER Portal</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="px-4 py-3 border-b border-border shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-secondary" />
              </div>
              <input
                type="text"
                aria-label="Search Manager navigation"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-input text-primary placeholder-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:text-sm motion-safe:transition-colors"
              />
            </div>
          </div>
        )}
        
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Search menu"
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Search size={18} />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
          {filteredNavGroups.length === 0 ? (
            <div className="text-center py-4 text-sm text-secondary">
              No matches found
            </div>
          ) : (
            filteredNavGroups.map((group) => (
              <div key={group.group}>
                {(!isCollapsed || isMobileOpen) && (
                  <p className="text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider">
                    {group.group}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    const showLabel = !isCollapsed || isMobileOpen;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={!showLabel ? item.label : ''}
                        className={`flex items-center gap-3 py-2.5 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base group cursor-pointer ${
                          !showLabel ? 'justify-center px-0' : 'px-3.5'
                        } ${
                          active
                            ? 'bg-primary-subtle text-primary border-l-2 border-primary shadow-card'
                            : 'text-secondary hover:text-primary hover:bg-primary-subtle border-l-2 border-transparent'
                        }`}
                      >
                        <Icon size={18} className={active ? 'text-primary' : 'text-secondary group-hover:text-primary motion-safe:transition-colors'} />
                        {showLabel && <span className="text-sm whitespace-nowrap">{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </nav>

        {/* User */}
        <div className={`px-4 py-4 border-t border-border bg-header shrink-0 flex items-center ${(!isCollapsed || isMobileOpen) ? 'gap-3' : 'justify-center'}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center text-on-primary text-sm font-bold border border-border bg-primary">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'M') : 'M'}
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="whitespace-nowrap overflow-hidden flex-1">
              <div className="text-primary text-sm font-bold truncate">{mounted ? (user?.name || 'Manager User') : 'Manager User'}</div>
              <div className="text-secondary text-xs truncate">{mounted ? (user?.role || 'Gym Manager') : 'Gym Manager'}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
