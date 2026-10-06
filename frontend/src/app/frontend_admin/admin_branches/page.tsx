// RESPONSIBILITY: Server Component entry point for /admin/branches. Rule 8 compliant — no , no AdminLayoutHeader import.
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminBranchesMain from '@/app/frontend_admin/admin_branches/admin_branches_components/admin_branches_main/AdminBranchesMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('branches.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminBranchesPage renders the admin branches page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminBranchesPage() {
  return (
      <AdminBranchesMain />
  );
}