// RESPONSIBILITY: Redirects the Superadmin role root route to the canonical Dashboard route.
import { redirect } from 'next/navigation';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_url_config';

export default function SuperadminHomePage() {
  redirect(DashboardUrlConfig.PAGES.MAIN);
}
