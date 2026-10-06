import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server component page for Admin Usage & Subscription.
import AdminUsageMain from '@/app/frontend_admin/admin_usage/admin_usage_components/admin_usage_main/AdminUsageMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_usage.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminUsagePage renders the admin usage page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminUsagePage() {
  return (
      <AdminUsageMain />
  );
}
