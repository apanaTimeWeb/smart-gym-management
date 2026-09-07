// RESPONSIBILITY: Server Component — entry point for the Notifications module.
import type { Metadata } from 'next';
import ManagerNotificationsMain from '@/app/manager/notifications/notifications_components/ManagerNotificationsMain/ManagerNotificationsMain';

export const metadata: Metadata = {
  title: 'Notifications | Manager — GymSmart',
  description: 'System alerts, member expiry warnings, and payment reminders.',
};

export default function ManagerNotificationsPage() {
  return <ManagerNotificationsMain />;
}
