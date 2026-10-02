'use client';
/**
 * RESPONSIBILITY: React component SuperadminLayout owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutSidebar, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutHeader, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutResponsiveTableProvider, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutPropsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root Superadmin shell. Owns only sidebar collapse, persistent header, global Superadmin feedback, and shell-level alerts.
import { useState } from 'react';
import type { ReactNode } from 'react';

import SuperadminLayoutHeader from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutHeader';
import SuperadminLayoutResponsiveTableProvider from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutResponsiveTableProvider';
import SuperadminLayoutSidebar from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutSidebar';
import { SuperadminLayoutTopLoader } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutTopLoader';

import type { SuperadminLayoutProps } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayoutPropsTypes';



/** @description Provides the authenticated Superadmin shell composition around role-owned feature content. @dependencies Uses role layout infrastructure and zero-business UI primitives only. @edge-case Preserves responsive sidebar/header behavior across collapsed and expanded states. */
export default function SuperadminLayout({ children }: SuperadminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <SuperadminLayoutTopLoader />
      <div className="min-h-screen bg-page text-primary">
      <SuperadminLayoutHeader />
      <SuperadminLayoutSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        
        {children}
      </main>
      <SuperadminLayoutResponsiveTableProvider />
      </div>
    </>
  );
}
