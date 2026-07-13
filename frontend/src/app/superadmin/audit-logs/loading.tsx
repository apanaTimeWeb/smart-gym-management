// RESPONSIBILITY: Skeleton loader for the Audit Logs page while data is being fetched.
export default function AuditLogsLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="h-7 w-48 bg-border rounded" />
          <div className="h-4 w-80 bg-border rounded mt-2" />
        </div>
        <div className="h-10 w-64 bg-border rounded-lg" />
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-12 bg-primary/5 border-b border-border" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex gap-4 px-6 py-4 border-b border-border">
            <div className="h-4 w-36 bg-border rounded" />
            <div className="h-4 w-40 bg-border rounded" />
            <div className="h-4 w-32 bg-border rounded" />
            <div className="h-4 w-44 bg-border rounded" />
            <div className="h-4 w-28 bg-border rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
