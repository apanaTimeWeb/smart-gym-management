import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the coupons page. Renders the interactive client component.
import SuperadminCouponsClient from '@/app/superadmin/coupons/coupons_components/SuperadminCouponsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminCouponsClient />
    </Suspense>
  );
}
