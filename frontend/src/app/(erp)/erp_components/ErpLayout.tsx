'use client';

import { useState } from 'react';
import ErpSidebar from './ErpSidebar';

export default function ErpLayout({ children }: { children: React.ReactNode }) {
 const [isCollapsed, setIsCollapsed] = useState(true);

 return (
 <div className="flex h-screen overflow-hidden bg-[var(--bg-page)] text-[var(--text-primary)]">
 <ErpSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:ml-[92px]' : 'lg:ml-64'}`}>
 {children}
 </main>
 </div>
 );
}
