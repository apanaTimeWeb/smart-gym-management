// RESPONSIBILITY: Renders the loading component and its associated UI logic.
export default function ReportsLoading() {
  return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['mrr', 'cancellations', 'health'].map((key) => (
          <div key={key} className="h-24 bg-card rounded-xl border border-border" />
        ))}
      </div>
      <div className="h-80 bg-card rounded-xl border border-border" />
    </div>
  );
}
