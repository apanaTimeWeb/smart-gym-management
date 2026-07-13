// RESPONSIBILITY: Skeleton loader for the Background Jobs page while data is being fetched.
export default function JobsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-border rounded" />
          <div className="h-4 w-72 bg-border rounded mt-2" />
        </div>
        <div className="h-10 w-40 bg-border rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 h-20" />
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-12 bg-primary/5 border-b border-border" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-4 px-4 py-4 border-b border-border">
            <div className="h-4 w-24 bg-border rounded" />
            <div className="h-4 w-32 bg-border rounded" />
            <div className="h-4 w-40 bg-border rounded" />
            <div className="h-4 w-20 bg-border rounded" />
            <div className="h-4 w-16 bg-border rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
