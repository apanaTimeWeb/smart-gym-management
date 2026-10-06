"use client";
// RESPONSIBILITY: Renders the collapsible left navigation sidebar with nav items, user identity footer, and mobile drawer. No API calls.
import { useTranslations } from 'next-intl';

import { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { getUser } from '@/lib/api';
import { ADMIN_NAV_GROUPS } from '@/app/frontend_admin/admin_layout/admin_layout_url_config';

import type { AdminSidebarProps } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

/**
 * AdminLayoutSidebar renders the admin sidebar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminLayoutSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const t = useTranslations();

  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef<HTMLElement>(null);
  const user = getUser();

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_shell/AdminLayoutSidebar.tsx.
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Listens for the global 'toggle-sidebar' event dispatched by AdminLayoutHeader's hamburger button.
  // On mobile (<768px) toggles the drawer; on tablet and desktop toggles the sidebar presentation..
// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_shell/AdminLayoutSidebar.tsx.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen(v => !v);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

  // Closes the mobile drawer whenever the route changes (user navigated to a new page).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_shell/AdminLayoutSidebar.tsx.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // EFFECT: Locks page scrolling, traps focus, closes the mobile drawer with Escape, and restores focus to the hamburger trigger.
  useEffect(() => {
    if (!isMobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const drawer = sidebarRef.current;
    const focusableSelector = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const focusFirst = () => {
      const first = drawer?.querySelector<HTMLElement>(focusableSelector);
      first?.focus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawer) return;
      const focusables = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusables.length === 0) return;
      const first = focusables[0] as HTMLElement | undefined;
      const last = focusables[focusables.length - 1] as HTMLElement | undefined;
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const frame = window.requestAnimationFrame(focusFirst);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (isMobileOpen) {
        document.querySelector<HTMLElement>('[data-testid="admin_layout-admin-sidebar-sidebar-toggle"]')?.focus();
      }
    };
  }, [isMobileOpen]);

  // Filter groups based on search query
  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return ADMIN_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    
    return ADMIN_NAV_GROUPS
      .map(group => ({
        ...group,
        items: group.items.filter(item => t(`admin_layout.AdminNavigation.items.${item.labelKey}`).toLowerCase().includes(lowerQuery))
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery, t]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-overlay backdrop-blur-sm z-40 md:hidden motion-safe:transition-opacity motion-safe:duration-base"
          onClick={() => setIsMobileOpen(false)}
         data-testid="admin_layout-admin-sidebar-click"/>
      )}

      <aside ref={sidebarRef} aria-label={t('admin_layout.AdminLayoutSidebar.text_sidebarLabel')} data-admin-shell-sidebar className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-border z-20 flex flex-col motion-safe:transition-all motion-safe:duration-slow md:w-16 ${
        isCollapsed ? 'xl:w-16' : 'xl:w-60'
      } ${
        isMobileOpen ? 'w-64 left-0' : 'w-64 -left-64 md:left-0'
      }`}>

        {/* Logo & Toggle */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt={t('admin_layout.AdminLayoutSidebar.text_1ca64e5fd3')} width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className={`whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-slow flex flex-col ${isMobileOpen ? 'flex' : 'hidden xl:flex'}`}>
                <span className="text-primary font-bold text-lg leading-tight tracking-tight">{t('admin_layout.AdminLayoutSidebar.text_3871a45480')}</span>
                <span className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5" data-testid="admin_layout-adminlayout-status-1">{t('admin_layout.AdminLayoutSidebar.text_b31bc5e6ee')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        {(!isCollapsed || isMobileOpen) && (
          <div className={`px-4 py-3 border-b border-border shrink-0 ${isMobileOpen ? 'block' : 'hidden xl:block'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-secondary"  strokeWidth={2}/>
              </div>
              <input
                type="text"
                placeholder={t('admin_layout.AdminLayoutSidebar.text_7994a318d8')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 min-h-11 border border-border rounded-lg leading-5 bg-input text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-focus sm:text-sm motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out"
               data-testid="admin_layout-admin-sidebar-control"/>
            </div>
          </div>
        )}
        
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button type="button"
              onClick={() => setIsCollapsed(false)}
              aria-label={t('admin_layout.AdminLayoutSidebar.text_13a91dc70a')}
              className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
             data-testid="admin_layout-admin-sidebar-click-2">
              <Search size={18}  strokeWidth={2}/>
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
          {filteredNavGroups.length === 0 ? (
            <div className="text-center py-4 text-sm text-secondary">
              {t('admin_layout.AdminLayoutSidebar.text_a68d28f1ee')}</div>
          ) : (
            filteredNavGroups.map((group , __testIdIndex180) => (
              <div key={group.groupKey}>
                {(!isCollapsed || isMobileOpen) && (
                  <p className={`text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider ${isMobileOpen ? 'block' : 'hidden xl:block'}`}>
                    {t(`admin_layout.AdminNavigation.groups.${group.groupKey}`)}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item , __testIdIndex188) => {
                    const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    const showLabel = !isCollapsed || isMobileOpen;

                    return (
                      <Link data-testid={`admin_layout-admin-sidebar-navigate-map180-${__testIdIndex180}-1`}
                        key={item.href}
                        href={item.href}
                        title={!showLabel ? t(`admin_layout.AdminNavigation.items.${item.labelKey}`) : ''}
                        className={`flex items-center gap-3 py-2.5 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base group cursor-pointer justify-center px-0 xl:justify-start xl:px-3.5 ${
                          active
                            ? 'bg-primary-subtle text-primary border-l-2 border-focus'
                            : 'text-secondary hover:text-primary hover:bg-primary-subtle border-l-2 border-transparent'
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
                        
                      >
                        <Icon size={18} strokeWidth={2} className={active ? 'text-primary' : 'text-secondary group-hover:text-primary motion-safe:transition-colors'} />
                        {showLabel && <span className={`text-sm whitespace-nowrap ${isMobileOpen ? 'inline' : 'hidden xl:inline'}`}>{t(`admin_layout.AdminNavigation.items.${item.labelKey}`)}</span>}
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
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className={`whitespace-nowrap overflow-hidden flex-1 ${isMobileOpen ? 'block' : 'hidden xl:block'}`}>
              <div className="text-primary text-sm font-bold truncate">{mounted ? (user?.name || t('admin_layout.AdminLayoutSidebar.remaining_adminUser')) : t('admin_layout.AdminLayoutSidebar.remaining_adminUser')}</div>
              <div className="text-secondary text-xs truncate">{mounted ? (user?.role || t('admin_layout.AdminLayoutSidebar.remaining_superAdmin')) : t('admin_layout.AdminLayoutSidebar.remaining_superAdmin')}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
