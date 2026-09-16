'use client';
// RESPONSIBILITY: Root shell layout for all MANAGER pages. Composes ManagerSidebar with the main content area. Manages sidebar collapsed state only.
import { useState } from 'react';
import ManagerSidebar from '@/app/manager/manager_components/ManagerLayout/ManagerSidebar';
import ManagerPermissionGate from '@/app/manager/manager_utils/ManagerPermissionGate';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

 return (
 <ManagerPermissionGate capability="manager.access">
 <div className="flex h-screen overflow-hidden bg-background text-foreground">
 <ManagerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`flex-1 flex flex-col h-screen overflow-y-auto motion-safe:transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
 {children}
 </main>
 </div>
 </ManagerPermissionGate>
 );
}
