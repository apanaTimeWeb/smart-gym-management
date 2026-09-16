import { Suspense } from 'react';
// RESPONSIBILITY: Server Component that acts as the entry point for the Tenants (Gyms) list page.
import type { Metadata } from 'next';
import SuperadminGymsClient from '@/app/superadmin/gyms/gyms_components/SuperadminGymsClient';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminErrorBoundary';

export const metadata: Metadata = {
  title: 'Gyms | Superadmin',
  description: 'Manage gyms.',
};

export default function GymsPage() {
  // In the future, server-side fetching can happen here before passing data to SuperadminGymsClient
  return (
    <SuperadminErrorBoundary>
      <SuperadminGymsClient />
    </SuperadminErrorBoundary>
  );
}

