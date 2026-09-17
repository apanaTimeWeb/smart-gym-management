import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: page.tsx acts as a Server Component entry point.
import SuperadminJobsView from '@/app/superadmin/jobs/jobs_components/SuperadminJobsView';
import SuperadminJobsV1Client from '@/app/superadmin/jobs/jobs_components/SuperadminJobsV1Client';
export default function JobsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminJobsView />
      <SuperadminJobsV1Client />
    </Suspense>);
}
