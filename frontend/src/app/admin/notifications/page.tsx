// RESPONSIBILITY: Server Component entry point for /admin/notifications. Rule 8 compliant — no 'use client', no AdminHeader import.
import type { Metadata } from 'next';
import AdminNotificationsClient from '@/app/admin/notifications/notifications_components/AdminNotificationsClient';

export const metadata: Metadata = {
  title: 'Notifications | Admin | GymSmart',
  description: 'View and manage your admin notifications.',
};

export default function AdminNotificationsPage() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 max-w-4xl mx-auto">
        <AdminNotificationsClient />
      </div>
    </div>
  );
}
