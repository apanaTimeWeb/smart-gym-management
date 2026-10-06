"use client";
// RESPONSIBILITY: Root Admin shell. Owns only sidebar collapse, persistent header, global Admin feedback, and shell-level alerts.
import { useState, type ReactNode } from 'react';
import AdminLayoutSidebar from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutSidebar';
import AdminLayoutHeader from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutHeader';
import AdminLayoutResponsiveTableProvider from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutResponsiveTableProvider';
import { AdminLayoutDensityProvider } from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutDensityProvider';
import AdminLayoutCommandPalette from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_command_palette/AdminLayoutCommandPalette';
import AdminLayoutKeyboardShortcuts from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutKeyboardShortcuts';
import AdminShellPrint from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutShellPrint.module.css';

import type { AdminLayoutProps } from '@/app/frontend_admin/admin_layout/admin_layout_shell/admin_layout_shell_types/AdminLayoutPropsTypes';


/**
 * AdminLayout renders the admin layout UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminLayout({ children, headerContextSlot }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminLayoutDensityProvider>
      <div className={`${AdminShellPrint.adminShellRoot} min-h-screen bg-page text-primary`} data-admin-shell>
        <div data-admin-shell-header><AdminLayoutHeader headerContextSlot={headerContextSlot} /></div>
        <AdminLayoutSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main data-admin-shell-main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'md:ml-16 xl:ml-16' : 'md:ml-16 xl:ml-60'}`}>
          {children}
        </main>
        <AdminLayoutResponsiveTableProvider />
        <div data-admin-shell-command-palette><AdminLayoutCommandPalette /></div>
        <AdminLayoutKeyboardShortcuts />
      </div>
    </AdminLayoutDensityProvider>
  );
}
