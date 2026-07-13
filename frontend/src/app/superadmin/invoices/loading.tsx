// RESPONSIBILITY: Skeleton loader for the SaaS Invoices page.
export default function InvoicesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="grid grid-cols-2 gap-6"><div className="h-28 bg-card rounded-xl border border-border" /><div className="h-28 bg-card rounded-xl border border-border" /></div>
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
}
