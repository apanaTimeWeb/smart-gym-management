import React from 'react';
import SuperadminLayout from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayout/SuperadminLayout';

export const metadata = {
  title: 'GymSmart Superadmin | Gym Management System',
  description: 'Complete gym management platform superadmin dashboard.',
};

import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

export default function FRONTEND_SUPERADMINLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <SuperadminLayoutRoleProviders>
        <SuperadminLayout>{children}</SuperadminLayout>
      </SuperadminLayoutRoleProviders>
    </ConfirmProvider>
  );
}
