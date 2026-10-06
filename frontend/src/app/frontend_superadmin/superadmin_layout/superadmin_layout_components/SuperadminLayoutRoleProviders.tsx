// RESPONSIBILITY: Renders/orchestrates SuperadminLayoutRoleProviders within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Composes the role-level providers required by the Superadmin application shell without owning feature business state.
import { SuperadminLayoutSocketProvider } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutSocketProvider';
import { SuperadminLayoutThemeProvider } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutThemeProvider';
import '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_styles/SuperadminLayoutStyles.css';

import type { SuperadminLayoutRoleProvidersProps } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes';



/**
 * @description Mounts role-level theme and WebSocket infrastructure once around each Superadmin route surface.
 * @dependencies Composes the role-owned SuperadminLayoutThemeProvider and SuperadminLayoutSocketProvider.
 * @edge-case Keeps providers independent of business feature state so feature modules remain portable.
 */
export default function SuperadminLayoutRoleProviders({ children }: SuperadminLayoutRoleProvidersProps) {
  return (
    <SuperadminLayoutThemeProvider>
      <SuperadminLayoutSocketProvider>{children}</SuperadminLayoutSocketProvider>
    </SuperadminLayoutThemeProvider>
  );
}
