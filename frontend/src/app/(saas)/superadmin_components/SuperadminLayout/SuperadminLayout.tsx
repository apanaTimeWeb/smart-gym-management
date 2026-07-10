'use client';

import { useState } from 'react';
import SuperadminSidebar from './SuperadminSidebar';

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-gray-100 font-sans">
      <SuperadminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:ml-[80px]' : 'lg:ml-64'} bg-gray-900 border-l border-gray-800 rounded-tl-2xl mt-4`}>
        <div className="p-8 pb-24">
          {children}
        </div>
      </main>
    </div>
  );
}
