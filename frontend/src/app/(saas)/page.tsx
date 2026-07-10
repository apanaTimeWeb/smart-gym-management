import { redirect } from 'next/navigation';
import { SuperadminUrlConfig } from '@/app/(saas)/superadmin_url_config';

export default function SaaSRootPage() {
  redirect(SuperadminUrlConfig.PAGES.DASHBOARD);
}
