// RESPONSIBILITY: Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardView.
import { Suspense } from 'react';
import SuperadminDashboardView from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardView';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';
export default function SaaSDashboardPage() {
    return (<SuperadminErrorBoundary>
      <SuperadminDashboardView />
    </SuperadminErrorBoundary>);
}
