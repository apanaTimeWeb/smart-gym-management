// RESPONSIBILITY: Renders metadata for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminCampaignsMain from '@/app/frontend_admin/admin_campaigns/admin_campaigns_components/admin_campaigns_main/AdminCampaignsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('campaigns.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminCampaignsPage renders the admin campaigns page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminCampaignsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminCampaignsMain />
    </div>
  );
}
