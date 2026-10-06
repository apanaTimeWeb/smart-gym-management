// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminAnnouncementsMain from '@/app/frontend_admin/admin_announcements/admin_announcements_components/admin_announcements_main/AdminAnnouncementsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('announcements.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminAnnouncementsPage renders the admin announcements page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminAnnouncementsPage() {
  return (
      <AdminAnnouncementsMain />
  );
}
