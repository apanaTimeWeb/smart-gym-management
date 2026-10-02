// RESPONSIBILITY: Renders the structural loading state for this Superadmin page.
export default function Loading() {
    return (<div className="space-y-6">
      <div className="h-10 w-72 rounded bg-skeleton-base motion-safe:animate-pulse"/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>
      <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
    </div>);
}
