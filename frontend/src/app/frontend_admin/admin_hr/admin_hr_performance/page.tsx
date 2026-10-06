import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server component entry point for the Admin Staff Performance Dashboard.
import AdminHrPerformance from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_performance/AdminHrPerformance';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_hr.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminHrPerformancePage renders the admin hr performance page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminHrPerformancePage() {
  // In a real app, Server-side auth check goes here.
  return (
      <AdminHrPerformance />
  );
}
