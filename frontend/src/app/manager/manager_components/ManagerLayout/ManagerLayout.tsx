'use client';
import type { ReactNode } from 'react';
// RESPONSIBILITY: Root shell layout for all MANAGER pages. Composes ManagerSidebar with the main content area. Manages sidebar collapsed state only.
import { useState } from 'react';
import ManagerSidebar from '@/app/manager/manager_components/ManagerLayout/ManagerSidebar';
import ManagerPermissionGate from '@/app/manager/manager_infrastructure/ManagerPermissionGate';

export default function ManagerLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

 return (
 <ManagerPermissionGate capability="manager.access">
 <div className="min-h-screen bg-page text-primary">
 <ManagerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`min-h-screen overflow-y-auto pt-16 motion-safe:transition-[margin-left] motion-safe:duration-300 ${isCollapsed ? 'lg:ml-15' : 'lg:ml-60'}`}>
 {children}
 </main>
 </div>
 </ManagerPermissionGate>
 );
}
