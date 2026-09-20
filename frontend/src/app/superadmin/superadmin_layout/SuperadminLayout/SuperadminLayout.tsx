// RESPONSIBILITY: Composes the Superadmin fixed header, responsive sidebar, and route content region. No business API calls.
'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import SuperadminSidebar from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebar';
import SuperadminHeader from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminHeader';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';

export default function SuperadminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-page font-sans text-primary">
      <SuperadminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`min-h-screen flex-1 overflow-y-auto pt-16 motion-safe:transition-[margin] motion-safe:duration-slow ${isCollapsed ? 'md:ml-16 xl:ml-16' : 'md:ml-16 xl:ml-60'}`}>
        <SuperadminHeader isCollapsed={isCollapsed} />
        <div className="p-6 pb-24">
          <SuperadminErrorBoundary>
            {children}
          </SuperadminErrorBoundary>
        </div>
      </main>
    </div>
  );
}
