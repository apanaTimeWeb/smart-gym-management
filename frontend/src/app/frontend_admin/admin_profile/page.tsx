// RESPONSIBILITY: Server Component entry point for /admin/profile. Rule 8 compliant — no .
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminProfileMain from '@/app/frontend_admin/admin_profile/admin_profile_components/admin_profile_main/AdminProfileMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_profile.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminProfilePage renders the admin profile page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminProfilePage() {
  return (
      <AdminProfileMain />
  );
}