// RESPONSIBILITY: Renders the Manager maintenance route loading skeleton matching the page layout.
export default function Loading() {
  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true" aria-label="Loading maintenance issues">
      {[1, 2, 3].map((item) => <div key={item} className="h-44 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"><div className="h-5 w-1/3 m-5 rounded bg-skeleton-highlight" /><div className="h-4 w-2/3 mx-5 rounded bg-skeleton-highlight" /></div>)}
    </div>
  );
}
