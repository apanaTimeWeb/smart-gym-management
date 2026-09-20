// RESPONSIBILITY: Pure Server Component for the affiliates page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminAffiliatesClient from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminAffiliatesClient />
    </Suspense>);
}
