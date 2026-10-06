// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminAuditLogsMain from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_components/admin_audit_logs_main/AdminAuditLogsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_audit_logs.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminAuditLogsPage renders the admin audit logs page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminAuditLogsPage() {
  return (
      <AdminAuditLogsMain />
  );
}
