// RESPONSIBILITY: Root shell layout for all ADMIN pages. Composes AdminSidebar with the main content area. Manages sidebar collapsed state only.
'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/admin/admin_components/AdminLayout/AdminSidebar';
import AdminUsageAlert from '@/app/admin/admin_components/AdminLayout/AdminUsageAlert';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

 return (
 <div className="flex h-screen overflow-hidden bg-background text-foreground">
 <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:ml-23' : 'lg:ml-64'}`}>
 <AdminUsageAlert />
 {children}
 </main>
 </div>
 );
}
