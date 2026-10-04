// RESPONSIBILITY: Owns the Next.js Superadmin role layout boundary and composes only role-level providers and shell infrastructure.
import React from 'react';

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import SuperadminLayout from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayout';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';

import type { SuperadminLayoutProps } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutProps';


export const metadata = {
  title: 'GymSmart Superadmin | Gym Management System',
  description: 'Complete gym management platform superadmin dashboard.',
};

/**
 * @description Renders FRONTEND_SUPERADMINLayout within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function FRONTEND_SUPERADMINLayout({ children }: SuperadminLayoutProps) {
  return (
    <ConfirmProvider>
      <SuperadminLayoutRoleProviders>
        <SuperadminLayout>{children}</SuperadminLayout>
      </SuperadminLayoutRoleProviders>
    </ConfirmProvider>
  );
}
