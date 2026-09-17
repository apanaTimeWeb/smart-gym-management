import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the affiliates page. Renders the interactive client component.
import SuperadminAffiliatesClient from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminAffiliatesClient />
    </Suspense>);
}
