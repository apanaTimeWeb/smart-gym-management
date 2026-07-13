// RESPONSIBILITY: Skeleton loader for the Affiliate Partners page.
export default function AffiliatesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="grid grid-cols-3 gap-4">{[...Array(2)].map((_, i) => <div key={i} className="h-24 bg-card rounded-xl border border-border" />)}</div>
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
}
