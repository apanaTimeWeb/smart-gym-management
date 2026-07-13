// RESPONSIBILITY: Root shell layout for all ERP pages. Composes ErpSidebar with the main content area. Manages sidebar collapsed state only.
'use client';

import { useState } from 'react';
import ErpSidebar from '@/app/erp/erp_components/ErpLayout/ErpSidebar';

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

 return (
 <div className="flex h-screen overflow-hidden bg-background text-foreground">
 <ErpSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:ml-23' : 'lg:ml-64'}`}>
 {children}
 </main>
 </div>
 );
}
