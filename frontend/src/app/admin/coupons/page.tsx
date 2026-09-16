import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the Coupons page.
import AdminCouponsMain from '@/app/admin/coupons/coupons_components/AdminCouponsMain/AdminCouponsMain';

export default function CouponsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminCouponsMain />
    </Suspense>
  );
}
