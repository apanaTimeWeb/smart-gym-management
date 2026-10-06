// RESPONSIBILITY: Server Component entry point for /admin/notifications.
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminNotificationsMain from '@/app/frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_main/AdminNotificationsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notifications.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminNotificationsPage owns only route metadata and module layout assembly.
 */
export default function AdminNotificationsPage() {
  return <AdminNotificationsMain />;
}
