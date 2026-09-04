export default function AdminLibraryLoading() {
  return <div className="p-6 space-y-4">{Array.from({length:3}).map((_,i) => <div key={i} className="h-20 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
}
