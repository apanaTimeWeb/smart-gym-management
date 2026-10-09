"use client";
// RESPONSIBILITY: Renders the Trainer role navigation shell, including desktop collapse, mobile drawer, navigation search, focus management, and route-aware active state. No feature business data or API ownership.
import { useEffect, useMemo, useRef, useState } from 'react';

import { Search } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Image from 'next/image';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { getUser } from '@/lib/api';

import { TRAINER_NAVIGATION_GROUPS } from '@/app/frontend_trainer/trainer_navigation/TrainerNavigationConstants';

import '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureSidebar.css';

import type { TrainerInfrastructureSidebarProps } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureLayoutTypes';












/**
 * @description Owns TrainerInfrastructureSidebar behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureSidebar, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureSidebar({ isCollapsed, setIsCollapsed }: TrainerInfrastructureSidebarProps) {
  const t = useTranslations('TRAINER_SHELL');
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const user = getUser();

// Effect contract: initialize browser-only navigation state after hydration and keep shell listeners synchronized with viewport/navigation changes.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) setIsMobileOpen((current) => !current);
      else setIsCollapsed((current) => !current);
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [setIsCollapsed]);

// Effect contract: initialize browser-only navigation state after hydration and keep shell listeners synchronized with viewport/navigation changes.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const first = sidebarRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
    first?.focus();
    document.body.classList.add('overflow-hidden');
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        document.querySelector<HTMLElement>('[data-trainer-sidebar-toggle]')?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
      if (!focusable?.length) return;
      const firstFocusable = focusable[0]!;
      const lastFocusable = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
      previouslyFocused?.focus();
    };
  }, [isMobileOpen]);

  const filteredNavGroups = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return TRAINER_NAVIGATION_GROUPS;
    return TRAINER_NAVIGATION_GROUPS
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => t(item.labelKey).toLowerCase().includes(normalized)),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, t]);

  const displayName = mounted ? user?.name || t('TEXT_DEFAULT_TRAINER_NAME') : t('TEXT_DEFAULT_TRAINER_NAME');
  const displayRole = mounted ? user?.role || t('TEXT_DEFAULT_PERSONAL_TRAINER') : t('TEXT_DEFAULT_PERSONAL_TRAINER');

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label={t('TEXT_CLOSE_NAVIGATION_SIDEBAR')}
          className="trainer-mobile-backdrop trainer-mobile-backdrop-safe-area focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
          onClick={() => setIsMobileOpen(false)}
          data-testid="trainer_infrastructure-sidebar-backdrop"
        />
      )}
      <aside
        ref={sidebarRef}
        id="trainer-sidebar"
        role={isMobileOpen ? 'dialog' : undefined}
        aria-label={t('TEXT_TRAINER_NAVIGATION')}
        aria-modal={isMobileOpen || undefined}
        className={`trainer-sidebar trainer-sidebar-safe-area motion-safe:transition-all motion-safe:duration-base ${isCollapsed ? 'trainer-sidebar-collapsed' : ''} ${isMobileOpen ? 'trainer-sidebar-open' : ''}`}
      >
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt={t('TEXT_GYMSMART_TRAINER')} width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="whitespace-nowrap flex flex-col">
                <span className="text-primary font-bold text-lg leading-tight tracking-tight">{t('TEXT_GYMSMART')}</span>
                <span className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5">{t('TEXT_TRAINER_APP')}</span>
              </div>
            )}
          </div>
        </div>
        {(!isCollapsed || isMobileOpen) && (
          <div className="px-4 py-3 border-b border-border shrink-0">
            <label htmlFor="trainer-sidebar-search" className="sr-only">{t('TEXT_SEARCH_MENU')}</label>
            <div className="relative">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"  strokeWidth={2}/>
              <input
                id="trainer-sidebar-search"
                type="search"
                placeholder={t('TEXT_SEARCH_MENU')}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="block w-full min-h-11 ps-9 pe-3 py-2 border border-border rounded-lg bg-input text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base"
                data-testid="trainer_infrastructure-sidebar-search"
              />
            </div>
          </div>
        )}
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button type="button" onClick={() => setIsCollapsed(false)} aria-label={t('TEXT_SEARCH_MENU')} className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_infrastructure-sidebar-expand_search">
              <Search size={18} aria-hidden="true"  strokeWidth={2}/>
            </button>
          </div>
        )}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 trainer-shell-scrollbar" aria-label={t('TEXT_TRAINER_NAVIGATION')}>
          {filteredNavGroups.length === 0 ? (
            <p className="text-center py-4 text-sm text-secondary">{t('TEXT_NO_MATCHES_FOUND')}</p>
          ) : filteredNavGroups.map((group) => (
            <div key={group.groupKey}>
              {(!isCollapsed || isMobileOpen) && <p className="text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider">{t(group.groupKey)}</p>}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  const showLabel = !isCollapsed || isMobileOpen;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={showLabel ? undefined : t(item.labelKey)}
                      onClick={() => { if (window.innerWidth < 768) setIsMobileOpen(false); }}
                      className={`flex items-center gap-3 min-h-11 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${showLabel ? 'px-3.5' : 'justify-center px-0'} ${active ? 'bg-primary-subtle text-primary border-s-2 border-focus' : 'text-secondary hover:text-primary hover:bg-primary-subtle border-s-2 border-transparent'}`}
                      data-testid={`trainer_infrastructure-sidebar-nav${item.href.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`}
                    >
                      <Icon size={18} strokeWidth={2} aria-hidden="true" />
                      {showLabel && <span className="truncate">{t(item.labelKey)}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto border-t border-border px-3 py-3">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shrink-0" aria-hidden="true">{displayName.charAt(0).toUpperCase()}</div>
            {(!isCollapsed || isMobileOpen) && <div className="min-w-0"><p className="text-sm font-semibold text-primary truncate">{displayName}</p><p className="text-xs text-secondary truncate">{displayRole}</p></div>}
          </div>
        </div>
      </aside>
    </>
  );
}
