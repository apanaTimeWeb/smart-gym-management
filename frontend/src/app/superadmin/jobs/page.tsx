import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: page.tsx acts as a Server Component entry point.
import SuperadminJobsView from '@/app/superadmin/jobs/jobs_components/SuperadminJobsView';
export default function JobsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminJobsView />
    </Suspense>);
}
