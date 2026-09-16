import { Suspense } from 'react';
// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import type { Metadata } from 'next';
import AdminSubscriptionsMain from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsMain/AdminSubscriptionsMain';

export const metadata: Metadata = {
  title: 'Subscription & Billing | Admin - GymSmart',
  description: 'Manage your GymSmart SaaS subscription, invoices, and payment methods.',
};

export default function AdminSubscriptionsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminSubscriptionsMain />
    </Suspense>
  );
}
