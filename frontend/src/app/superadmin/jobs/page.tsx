import { Suspense } from 'react';
// RESPONSIBILITY: page.tsx acts as a Server Component entry point.
import SuperadminJobsView from '@/app/superadmin/jobs/jobs_components/SuperadminJobsView';

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminJobsView />
    </Suspense>
  );
}
