// RESPONSIBILITY: Composes the authenticated Manager shell, including the fixed header, responsive sidebar, permission boundary, and global keyboard command surface.
'use client';


import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import ManagerCommandPalette from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_command_palette/ManagerCommandPalette';
import ManagerBreadcrumb from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_breadcrumb/ManagerBreadcrumb';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerSidebar from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_sidebar/ManagerSidebar';
import ManagerPermissionGate from '@/app/frontend_manager/manager_infrastructure/ManagerPermissionGate';
import { MANAGER_HEADER_NAVIGATION } from '@/app/frontend_manager/manager_navigation/ManagerHeaderNavigationConfig';
import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/ManagerNavigationConfig';
import type { ManagerHeaderProps } from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_layout/ManagerLayoutTypes';

/**
 * @description Composes the fixed Manager header, responsive sidebar, permission boundary, and global keyboard command surface for authenticated Manager routes.
 * @dependencies ManagerHeader, ManagerSidebar, ManagerCommandPalette, ManagerPermissionGate, and Manager navigation configuration.
 * @edge-case Preserves the collapsed sidebar state across route renders and falls back to the Manager shell title when a route is not present in the role navigation map.
 */
export default function ManagerLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCommandPaletteRequested, setIsCommandPaletteRequested] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('MANAGER_SHELL');

  const currentPage = useMemo(() => {
    const navigationItems = MANAGER_NAV_GROUPS.flatMap((group) => group.items);
    return navigationItems.find((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)));
  }, [pathname]);

  const headerProps = useMemo<ManagerHeaderProps>(() => ({
    title: currentPage ? t(currentPage.labelKey) : t('NAV_DASHBOARD'),
    subtitle: currentPage ? t('TEXT_MANAGER_PORTAL_CONTEXT') : undefined,
  }), [currentPage, t]);

  // Keep profile/settings/scanner routes usable even though they are intentionally outside the primary sidebar inventory.
  const shellFallbackTitle = useMemo(() => {
    if (pathname === MANAGER_HEADER_NAVIGATION.notifications) return t('NAV_NOTIFICATIONS');
    if (pathname === MANAGER_HEADER_NAVIGATION.profile) return t('COPY_MY_PROFILE');
    if (pathname === MANAGER_HEADER_NAVIGATION.settings) return t('COPY_SETTINGS');
    return null;
  }, [pathname, t]);

  const resolvedHeaderTitle = shellFallbackTitle ?? headerProps.title;
  const resolvedHeaderSubtitle = shellFallbackTitle ? undefined : headerProps.subtitle;
  const handleOpenCommandPalette = () => setIsCommandPaletteRequested(true);

  return (
    <ManagerPermissionGate capability="manager.access">
      <div className="min-h-screen bg-page text-primary">
        <ManagerHeader data-testid="manager_navigation-managerlayout-managerheader-1"
          title={resolvedHeaderTitle}
          subtitle={resolvedHeaderSubtitle}
          onOpenCommandPalette={handleOpenCommandPalette}
        />
        <ManagerSidebar data-testid="manager_navigation-managerlayout-managersidebar-2" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <ManagerCommandPalette data-testid="manager_navigation-managerlayout-managercommandpalette-3" requestedOpen={isCommandPaletteRequested} onRequestedOpenHandled={() => setIsCommandPaletteRequested(false)} />
        <main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
          <div className="px-4 py-4 md:px-6">
            <ManagerBreadcrumb />
            {children}
          </div>
        </main>
      </div>
    </ManagerPermissionGate>
  );
}
