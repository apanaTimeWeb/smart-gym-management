// RESPONSIBILITY: SuperadminLayout.tsx serves as the main structural layout for all SaaS control panel pages.
'use client';
import type { ReactNode } from 'react';
import { useState } from 'react';
import SuperadminSidebar from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminSidebar';
import SuperadminHeader from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminHeader';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';
import SuperadminGymGhostLoginBanner from '@/app/superadmin/gyms/gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner';
export default function SuperadminLayout({ children }: {
    children: ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (<div className="flex h-screen overflow-hidden bg-page text-primary font-sans">
      <SuperadminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      <main className={`flex-1 flex flex-col h-screen overflow-y-auto motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <SuperadminGymGhostLoginBanner />
        <SuperadminHeader />
        <div className="p-8 pb-24 bg-card border-l border-t border-border rounded-tl-2xl mt-4 mx-4">
          <SuperadminErrorBoundary>
            {children}
          </SuperadminErrorBoundary>
        </div>
      </main>
    </div>);
}
