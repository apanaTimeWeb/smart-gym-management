import { Suspense } from 'react';
// RESPONSIBILITY: Server component page for Admin Usage & Subscription.
import AdminUsageMain from '@/app/admin/usage/usage_components/AdminUsageMain/AdminUsageMain';

export const metadata = { title: 'Usage & Subscription — Admin | Smart Gym 360' };

export default function AdminUsagePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminUsageMain />
    </Suspense>
  );
}
