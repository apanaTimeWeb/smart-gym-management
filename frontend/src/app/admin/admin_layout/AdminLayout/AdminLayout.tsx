"use client";
// RESPONSIBILITY: Root Admin shell. Owns only sidebar collapse, persistent header, global Admin feedback, and shell-level alerts.

import { useState, type ReactNode } from 'react';
import AdminSidebar from '@/app/admin/admin_layout/AdminLayout/AdminSidebar';
import AdminHeader from '@/app/admin/admin_layout/AdminLayout/AdminHeader';
import AdminUsageAlert from '@/app/admin/usage/usage_components/AdminUsageAlert/AdminUsageAlert';
import AdminResponsiveTableProvider from '@/app/admin/admin_layout/AdminLayout/AdminResponsiveTableProvider';

import type { AdminLayoutProps } from '@/app/admin/admin_layout/AdminLayout/AdminLayoutPropsTypes';


export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-page text-primary">
      <AdminHeader />
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <AdminUsageAlert />
        {children}
      </main>
      <AdminResponsiveTableProvider />
    </div>
  );
}
