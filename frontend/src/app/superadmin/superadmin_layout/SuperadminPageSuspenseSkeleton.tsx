// RESPONSIBILITY: Renders the shared Superadmin route-level Suspense skeleton matching the authenticated page shell without fetching data.
import SuperadminPageSuspenseSkeletonPart from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeletonPart';

export default function SuperadminPageSuspenseSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading Superadmin page" aria-busy="true">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <SuperadminPageSuspenseSkeletonPart className="h-7 w-56" />
          <SuperadminPageSuspenseSkeletonPart className="h-4 w-80 max-w-full" />
        </div>
        <div className="flex gap-2">
          <SuperadminPageSuspenseSkeletonPart className="h-10 w-28" />
          <SuperadminPageSuspenseSkeletonPart className="h-10 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {['kpi-a', 'kpi-b', 'kpi-c', 'kpi-d'].map((id) => <SuperadminPageSuspenseSkeletonPart key={id} className="h-28 rounded-xl" />)}
      </div>
      <SuperadminPageSuspenseSkeletonPart className="h-16 rounded-xl" />
      <SuperadminPageSuspenseSkeletonPart className="h-96 rounded-xl" />
    </div>
  );
}
