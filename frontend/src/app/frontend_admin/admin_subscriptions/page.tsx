// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminSubscriptionsMain from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_main/AdminSubscriptionsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('subscriptions.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminSubscriptionsPage renders the admin subscriptions page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminSubscriptionsPage() {
  return (
      <AdminSubscriptionsMain />
  );
}
