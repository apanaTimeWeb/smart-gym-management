// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import { redirect } from 'next/navigation';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_url_config';

export default function SuperadminRootPage() {
  redirect(DashboardUrlConfig.PAGES.MAIN);
}
