import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the coupons page. Renders the interactive client component.
import SuperadminCouponsClient from '@/app/superadmin/coupons/coupons_components/SuperadminCouponsClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminCouponsClient />
    </Suspense>);
}
