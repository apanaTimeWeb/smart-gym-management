// RESPONSIBILITY: Renders the shared Superadmin route-level Suspense skeleton matching the authenticated page shell without fetching data.
const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`animate-pulse rounded-md bg-skeleton-base ${className || ''}`} {...props} />
);

export default function SuperadminPageSuspenseSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading Superadmin page" aria-busy="true">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {['kpi-a', 'kpi-b', 'kpi-c', 'kpi-d'].map((id) => <Skeleton key={id} className="h-28 rounded-xl" />)}
      </div>
      <Skeleton className="h-16 rounded-xl" />
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );
}
