// RESPONSIBILITY: Renders the persistent fixed Admin shell header. It owns shell controls only; feature business logic stays inside feature modules.
"use client";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { CircleHelp, Menu, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import AdminLayoutDensityToggle from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutDensityToggle';
import type { AdminLayoutProps } from '@/app/frontend_admin/admin_layout/admin_layout_shell/admin_layout_shell_types/AdminLayoutPropsTypes';
import AdminLayoutHeaderProfile from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutHeaderProfile';
import { AdminLayoutRouteHeaderConfig } from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutRouteHeaderConfig';
import { AdminLayoutUrlConfig } from '@/app/frontend_admin/admin_layout/admin_layout_url_config';

/**
 * @description AdminLayoutHeader renders only shell-owned controls and route chrome; no business feature is imported into the shell boundary.
 * @dependencies Consumes shell i18n, shell route-header configuration, shell navigation configuration, and global design primitives.
 * @edge-case Header shortcuts remain actionable without requiring any business module to be mounted or imported.
 */
export default function AdminLayoutHeader({ headerContextSlot }: Pick<AdminLayoutProps, 'headerContextSlot'>) {
  const t = useTranslations();
  const pathname = usePathname();
  const { titleKey, subtitleKey } = AdminLayoutRouteHeaderConfig(pathname);
  return (
    <header data-admin-shell-header className="fixed inset-x-0 top-0 z-20 h-16 bg-header backdrop-blur border-b border-border px-6 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <button type="button" className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-surface-hover rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))} aria-label={t('admin_layout.AdminLayoutHeader.text_8b9b1bbd66')} data-testid="admin_layout-admin-header-sidebar-toggle">
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0"><h1 className="text-xl font-bold text-primary truncate">{t(`admin_layout.AdminRouteHeaders.${titleKey}`)}</h1><p className="text-sm text-secondary truncate mt-0.5">{t(`admin_layout.AdminRouteHeaders.${subtitleKey}`)}</p></div>
      </div>
      <div className="flex shrink-0 items-center gap-2 lg:gap-3">{headerContextSlot}
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-admin-command-palette'))} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('admin_layout.AdminLayoutKeyboardShortcuts.openCommandPalette')} title={t('admin_layout.AdminLayoutKeyboardShortcuts.openCommandPalette')} data-testid="admin_layout-admin-header-command-palette-open"><Search size={18} strokeWidth={2} aria-hidden="true" /></button>
        <AdminLayoutDensityToggle />
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-admin-shortcut-help'))} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('admin_layout.AdminLayoutKeyboardShortcuts.showHelp')} title={t('admin_layout.AdminLayoutKeyboardShortcuts.showHelp')} data-testid="admin_layout-admin-header-shortcut-help-open"><CircleHelp size={18} strokeWidth={2} aria-hidden="true" /></button>
        <ThemeToggle />
        <AdminLayoutHeaderProfile profileHref={AdminLayoutUrlConfig.PAGES.PROFILE} settingsHref={AdminLayoutUrlConfig.PAGES.SETTINGS} />
      </div>
    </header>
  );
}
