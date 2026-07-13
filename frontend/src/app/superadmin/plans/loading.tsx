// RESPONSIBILITY: Skeleton loader for the Subscription Plans page while data is being fetched.
export default function PlansLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-56 bg-border rounded" />
          <div className="h-4 w-80 bg-border rounded mt-2" />
        </div>
        <div className="h-10 w-40 bg-border rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-card border border-border rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
