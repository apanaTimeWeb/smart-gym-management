import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server component page for Admin Members. Passes no initial data (client-side fetch via hook).
import AdminMembersMain from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_main/AdminMembersMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('members.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminMembersPage renders the admin members page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminMembersPage() {
  return (
      <AdminMembersMain />
  );
}
