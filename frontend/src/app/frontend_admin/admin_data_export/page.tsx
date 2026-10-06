import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server Component entry point for the scope-blocked Admin Data Export route.
import AdminDataExportMain from '@/app/frontend_admin/admin_data_export/admin_data_export_components/admin_data_export_main/AdminDataExportMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('data-export.metadata');
  return { title: t('title'), description: t('description') };
}

/** AdminDataExportPage owns route metadata and module layout assembly only. */
export default function AdminDataExportPage() {
  return <AdminDataExportMain />;
}
