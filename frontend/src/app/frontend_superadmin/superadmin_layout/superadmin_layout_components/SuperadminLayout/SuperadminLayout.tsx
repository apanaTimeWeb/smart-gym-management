"use client";
// RESPONSIBILITY: Root Superadmin shell. Owns only sidebar collapse, persistent header, global Superadmin feedback, and shell-level alerts.

import { useState, type ReactNode } from 'react';
import SuperadminSidebar from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminSidebar';
import SuperadminHeader from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminHeader';
import SuperadminResponsiveTableProvider from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminResponsiveTableProvider';

import type { SuperadminLayoutProps } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminLayoutPropsTypes';


export default function SuperadminLayout({ children }: SuperadminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-page text-primary">
      <SuperadminHeader />
      <SuperadminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        
        {children}
      </main>
      <SuperadminResponsiveTableProvider />
    </div>
  );
}
