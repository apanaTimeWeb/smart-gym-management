// RESPONSIBILITY: Root layout for the ADMIN module. The application-level QueryProvider is the single server-state cache boundary.
import React from 'react';
import AdminLayout from '@/app/admin/admin_components/AdminLayout/AdminLayout';
import { AdminConfirmProvider } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';
import { AdminToastProvider } from '@/app/admin/admin_components/AdminFeedback/AdminToastProvider';
import AdminDialogAccessibilityProvider from '@/app/admin/admin_components/AdminFeedback/AdminDialogAccessibilityProvider';
import AdminToastBridge from '@/app/admin/admin_components/AdminFeedback/AdminToastBridge';

export const metadata = {
  title: 'GymSmart ADMIN | Gym Management System',
  description: 'Complete gym management platform — members, attendance, finance, HR, and more.',
};

export default function ADMINLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminConfirmProvider>
      <AdminToastProvider />
      <AdminDialogAccessibilityProvider />
      <AdminToastBridge />
      <AdminLayout>{children}</AdminLayout>
    </AdminConfirmProvider>
  );
}
