// RESPONSIBILITY: Entry point for the Admin Plan Revenue Dashboard route.
import AdminPlansRevenue from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_revenue/AdminPlansRevenue';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('plans.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminPlanRevenuePage renders the admin plan revenue page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminPlanRevenuePage() {
  return (
      <AdminPlansRevenue />
  );
}
