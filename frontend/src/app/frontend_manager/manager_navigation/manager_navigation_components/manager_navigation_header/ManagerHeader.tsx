// RESPONSIBILITY: Renders ManagerHeader's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, Building2, Command, LogOut, Menu, QrCode, Search, Settings, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser, logout } from '@/lib/api';
import { ThemeToggle } from '@/components/ui/theme_toggle/ThemeToggle';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_HEADER_NAVIGATION } from '@/app/frontend_manager/manager_navigation/ManagerHeaderNavigationConfig';
import type { ManagerHeaderProps } from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_layout/ManagerLayoutTypes';


/** @description Renders the ManagerHeader component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerHeader({ title, subtitle, action, onOpenCommandPalette }: ManagerHeaderProps) {
  const t = useTranslations('MANAGER_SHELL');

  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const user = getUser();

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Attaches click-outside listener once on mount to close notification/profile dropdowns on outside click.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 bg-header-translucent backdrop-blur-md border-b border-border px-4 lg:px-6 flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4 flex-1">
        <button data-testid="manager_navigation-header-button-sidebar-toggle"
          aria-label={t("COPY_TOGGLE_SIDEBAR")}
          className="min-h-11 min-w-11 p-2 -ml-3 text-secondary hover:text-primary motion-safe:transition-all bg-input hover:bg-page rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
        >
          <Menu size={18} strokeWidth={2}/>
        </button>
        <div>
          <h1 className="text-page-title font-bold text-primary">{title}</h1>
          {subtitle && <p className="text-sm text-secondary mt-0.5">{subtitle}</p>}
        </div>
        <button
          type="button"
          data-testid="manager_navigation-header-button-command-palette"
          aria-label={t('COMMAND_PALETTE_OPEN_BUTTON')}
          onClick={onOpenCommandPalette}
          className="hidden sm:inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm text-secondary hover:bg-page hover:text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          <Search size={18} strokeWidth={2} aria-hidden="true" />
          <span>{t('COMMAND_PALETTE_OPEN_BUTTON')}</span>
          <span className="ml-1 hidden lg:inline-flex items-center gap-1 text-xs text-disabled">
            <Command size={18} strokeWidth={2} aria-hidden="true" />
            {t('SHORTCUT_KEY_COMMAND_PALETTE')}
          </span>
        </button>
        <div className="hidden xl:flex items-center gap-2 border-l border-border pl-4" aria-label={ManagerEnvConfig.gymName}>
          <Building2 size={18} strokeWidth={2} className="text-secondary" aria-hidden="true" />
          <span className="max-w-56 truncate text-sm font-medium text-secondary" title={ManagerEnvConfig.gymName}>{ManagerEnvConfig.gymName}</span>
        </div>
        
        {action && (
          <div className="hidden sm:block ml-4 pl-4 border-l border-border">
            <button data-testid="manager_navigation-layout-action" 
              onClick={action.onClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
            >
              {action.icon}
              {action.label}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4">


        {/* QR Scanner Mode (Kiosk) — visible on all breakpoints (Rule 64) */}
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-all border border-transparent hover:border-border flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_navigation-header-button-scanner"
          onClick={() => router.push(MANAGER_HEADER_NAVIGATION.scanner)}
          aria-label={t("COPY_OPEN_QR_SCANNER_KIOSK_MODE")}
          
        >
          <QrCode size={18} strokeWidth={2}/>
          <span className="hidden sm:inline text-sm font-medium">{t("COPY_SCANNER")}</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications — navigation only; notification business data belongs to the Notifications feature. */}
        <Link data-testid="manager_navigation-header-link-notifications"
          href={MANAGER_HEADER_NAVIGATION.notifications}
          aria-label={t("COPY_OPEN_NOTIFICATIONS")}
          className="relative min-h-11 min-w-11 p-2 text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-all border border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out"
        >
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
        </Link>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-11 h-11 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-all motion-safe:hover:scale-105 border border-border bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_navigation-header-button-profile"
            onClick={() => setShowProfile(!showProfile)}
            aria-label={t("COPY_TOGGLE_PROFILE_MENU")}
            
          >
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-card border border-border overflow-hidden z-30">
              <div className="px-4 py-3 border-b border-border bg-overlay">
                <p className="text-sm font-semibold text-primary">{mounted ? (user?.name || t("TEXT_MANAGER_DEFAULT_NAME")) : t("TEXT_MANAGER_DEFAULT_NAME")}</p>
                <p className="text-xs text-secondary">{mounted ? (user?.email || '') : ''}</p>
                {(mounted && user?.role) && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}
              </div>
              <div className="py-1">
                <Link data-testid="manager_navigation-header-link-profile" href={MANAGER_HEADER_NAVIGATION.profile} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => setShowProfile(false)}>
                  <User size={18} strokeWidth={2}/>{t("COPY_MY_PROFILE")}</Link>
                <Link data-testid="manager_navigation-header-link-settings" href={MANAGER_HEADER_NAVIGATION.settings} className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => setShowProfile(false)}>
                  <Settings size={18} strokeWidth={2}/>{t("COPY_SETTINGS")}</Link>
              </div>
              <div className="border-t border-border py-1 bg-overlay">
                <button data-testid="manager_navigation-header-button-logout"
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                  onClick={() => { setShowProfile(false); logout(); }}
                >
                  <LogOut size={18} strokeWidth={2}/>{t("COPY_LOG_OUT")}</button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
