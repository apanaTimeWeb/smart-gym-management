// RESPONSIBILITY: Pure Server Component for the coupons page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminCouponsClient from '@/app/superadmin/saas-billing/coupons/coupons_components/SuperadminCouponsClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminCouponsClient />
    </Suspense>);
}
