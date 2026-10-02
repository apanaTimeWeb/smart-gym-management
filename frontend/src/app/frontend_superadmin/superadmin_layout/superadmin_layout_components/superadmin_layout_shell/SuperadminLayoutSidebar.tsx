'use client';
/**
 * RESPONSIBILITY: React component SuperadminLayoutSidebar owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState, useEffect, useMemo, usePathname
 * MODULE DEPENDENCIES: next/navigation, next/link, next/image, lucide-react, @/lib/api, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the collapsible left navigation sidebar with nav items, user identity footer, and mobile drawer. No API calls.
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';

import { SUPERADMIN_NAV_GROUPS } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_constants/SuperadminLayoutSidebarNavigationConfig';

import type { SuperadminLayoutSidebarProps } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutTypes';


/** @description Renders the Superadmin role navigation shell and its responsive collapsed state. @dependencies Consumes role-owned navigation configuration and approved UI primitives. @edge-case Keeps navigation keyboard accessible in both expanded and collapsed modes. */
export default function SuperadminLayoutSidebar({ isCollapsed, setIsCollapsed }: SuperadminLayoutSidebarProps) {
  const t = useTranslations('SuperadminLayoutStyles');
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);
  const drawerTriggerRef = useRef<HTMLElement | null>(null);
  const user = getUser();

  const focusDrawer = useMemo(() => {
    return (container: HTMLElement | null) => {
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      focusable[0]?.focus();
    };
  }, []);

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminLayoutStyles/SuperadminLayout/SuperadminLayoutSidebar.tsx.
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Listens for the global 'toggle-sidebar' event dispatched by SuperadminLayoutHeader's hamburger button.
  // On mobile (<768px) toggles the drawer; tablet/desktop toggle the collapsed icon-only mode..
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminLayoutStyles/SuperadminLayout/SuperadminLayoutSidebar.tsx.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        drawerTriggerRef.current = document.getElementById('superadmin-sidebar-toggle');
        setIsMobileOpen(v => !v);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (!isMobileOpen) {
      document.body.style.overflow = '';
      drawerTriggerRef.current?.focus();
      return;
    }
    document.body.style.overflow = 'hidden';
    focusDrawer(drawerCloseRef.current?.closest('aside') ?? null);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const aside = drawerCloseRef.current?.closest('aside');
      if (!aside) return;
      const focusable = Array.from(aside.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusDrawer, isMobileOpen]);

  // Closes the mobile drawer whenever the route changes (user navigated to a new page).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminLayoutStyles/SuperadminLayout/SuperadminLayoutSidebar.tsx.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Filter groups based on search query
  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return SUPERADMIN_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    
    return SUPERADMIN_NAV_GROUPS
      .map(group => ({
        ...group,
        items: group.items.filter(item => t(item.labelKey).toLowerCase().includes(lowerQuery))
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-overlay backdrop-blur-sm z-40 lg:hidden motion-safe:transition-opacity motion-safe:duration-base"
          onClick={() => setIsMobileOpen(false)}
         data-testid="superadmin_layout_shell-superadminsidebar-interaction-layer-1"/>
      )}

      <aside className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-border z-20 flex flex-col motion-safe:transition-all motion-safe:duration-slow w-64 ${
        isCollapsed ? 'md:w-16' : 'md:w-64'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`} aria-label={t('ui.superadmin_sidebar_label')}>

        {isMobileOpen && (
          <div className="flex items-center justify-end border-b border-border px-4 py-2 md:hidden">
            <button ref={drawerCloseRef} type="button" onClick={() => setIsMobileOpen(false)} aria-label={t('ui.close_sidebar')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="SuperadminLayoutStyles-superadmin-sidebar-superadmin-sidebar-close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}

        {/* Logo & Toggle */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt={t('ui.gymsmart_admin_2b8e9f13')} width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-slow flex flex-col">
                <span className="text-primary font-bold text-lg leading-tight tracking-tight">{t('ui.gymsmart_8e4d6efe')}</span>
                <span className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5">{t('ui.admin_system_100f28d6')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        {(!isCollapsed || isMobileOpen) && (
          <div className={`px-4 py-3 ${isMobileOpen ? 'block' : 'hidden md:block'} border-b border-border shrink-0`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-secondary" />
              </div>
              <input
                type="text"
                placeholder={t('ui.search_menu_97ecae35')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 min-h-11 border border-border rounded-lg leading-5 bg-input text-primary placeholder-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-focus sm:text-sm motion-safe:transition-colors motion-safe:duration-base"
               data-testid="SuperadminLayoutStyles-superadmin-sidebar-layout-superadmin-sidebar-text"/>
            </div>
          </div>
        )}
        
        {isCollapsed && !isMobileOpen && (
          <div className="hidden xl:flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label={t('ui.search_menu_898fbc2a')}
              className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
             data-testid="SuperadminLayoutStyles-superadmin-sidebar-superadmin-sidebar-search-menu">
              <Search size={18} />
            </button>
          </div>
        )}

        {!isMobileOpen && (
          <div className="hidden md:flex xl:hidden items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button type="button" onClick={() => setSearchQuery('')} aria-label={t('ui.search_menu_898fbc2a')} className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="SuperadminLayoutStyles-superadmin-sidebar-superadmin-sidebar-tablet-search">
              <Search size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
          {filteredNavGroups.length === 0 ? (
            <div className="text-center py-4 text-sm text-secondary">
              {t('ui.no_matches_found_d132286c')}</div>
          ) : (
            filteredNavGroups.map((group) => (
              <div key={group.labelKey}>
                {(!isCollapsed || isMobileOpen) && (
                  <p className={`${isMobileOpen ? 'block' : 'hidden md:block'} text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider`}>
                    {t(group.labelKey)}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    const showLabel = !isCollapsed || isMobileOpen;
                    const labelVisibilityClass = isMobileOpen ? 'inline' : (!isCollapsed ? 'hidden md:inline' : 'hidden');

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={!showLabel ? t(item.labelKey) : ''}
                        className={`flex items-center gap-3 py-2.5 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base group cursor-pointer ${
                          !showLabel ? 'justify-center px-0' : 'px-3.5'
                        } ${
                          active
                            ? 'bg-primary-subtle text-primary border-l-2 border-focus'
                            : 'text-secondary hover:text-primary hover:bg-primary-subtle border-l-2 border-transparent'
                        }`}
                        
                       data-testid="SuperadminLayoutStyles-superadmin-sidebar-layout-superadmin-sidebar-link">
                        <Icon size={18} className={active ? 'text-primary' : 'text-secondary group-hover:text-primary motion-safe:transition-colors'} />
                        {showLabel && <span className={`text-sm whitespace-nowrap ${labelVisibilityClass}`}>{t(item.labelKey)}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </nav>

        {/* User */}
        <div className={`px-4 py-4 border-t border-border bg-header shrink-0 flex items-center ${isMobileOpen ? 'gap-3' : (!isCollapsed ? 'justify-center md:justify-start md:gap-3' : 'justify-center')}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center text-on-primary text-sm font-bold border border-border bg-primary">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className={`${isMobileOpen ? 'block' : 'hidden md:block'} whitespace-nowrap overflow-hidden flex-1`}>
              <div className="text-primary text-sm font-bold truncate">{mounted ? (user?.name || t('ui.superadmin_user')) : t('ui.superadmin_user')}</div>
              <div className="text-secondary text-xs truncate">{mounted ? (user?.role || t('ui.superadmin_role')) : t('ui.superadmin_role')}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
