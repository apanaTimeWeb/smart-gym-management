import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the plans page. Renders the interactive client component.
import SuperadminPlansClient from '@/app/superadmin/plans/plans_components/SuperadminPlansClient';
import SuperadminPlansV1Client from '@/app/superadmin/plans/plans_components/SuperadminPlansV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminPlansClient />
      <SuperadminPlansV1Client />
    </Suspense>);
}
