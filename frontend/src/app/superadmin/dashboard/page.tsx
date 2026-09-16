import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardView.
import SuperadminDashboardView from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardView';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminErrorBoundary';

export default function SaaSDashboardPage() {
  return (
    <SuperadminErrorBoundary>
      <SuperadminDashboardView />
    </SuperadminErrorBoundary>
  );
}
