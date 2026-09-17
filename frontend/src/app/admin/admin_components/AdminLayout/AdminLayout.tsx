"use client";
// RESPONSIBILITY: Root Admin shell. Owns only sidebar collapse, persistent header, global Admin feedback, and shell-level alerts.

import { useState, type ReactNode } from 'react';
import AdminSidebar from '@/app/admin/admin_components/AdminLayout/AdminSidebar';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminUsageAlert from '@/app/admin/admin_components/AdminLayout/AdminUsageAlert';
import AdminImpersonationBanner from '@/app/admin/admin_components/AdminLayout/AdminImpersonationBanner';
import AdminResponsiveTableProvider from '@/app/admin/admin_components/AdminLayout/AdminResponsiveTableProvider';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminHeader />
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`min-h-screen pt-16 motion-safe:transition-[margin] motion-safe:duration-300 ${isCollapsed ? 'lg:ml-[60px]' : 'lg:ml-60'}`}>
        <AdminImpersonationBanner />
        <AdminUsageAlert />
        {children}
      </main>
      <AdminResponsiveTableProvider />
    </div>
  );
}
