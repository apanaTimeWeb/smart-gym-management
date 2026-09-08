// RESPONSIBILITY: Renders the skeleton loading state for the Plan Revenue Dashboard.
import { IndianRupee } from 'lucide-react';

export default function Loading() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto motion-safe:animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-secondary flex items-center gap-2">
            <IndianRupee className="text-disabled" size={28} />
            Loading Plan Revenue...
          </h1>
          <div className="h-4 bg-input rounded w-64 mt-2" />
        </div>
        <div className="h-10 bg-input rounded-xl w-64" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-card border border-border rounded-xl p-5" />
        ))}
      </div>

      <div className="h-[250px] bg-card border border-border rounded-xl p-5" />
      <div className="h-64 bg-card border border-border rounded-xl" />
    </div>
  );
}
