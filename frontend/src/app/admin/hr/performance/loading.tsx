import { Target } from 'lucide-react';

export default function Loading() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-border rounded-lg mb-2"></div>
          <div className="h-4 w-64 bg-border rounded-lg"></div>
        </div>
        <div className="h-10 w-64 bg-border rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-card border border-border rounded-xl"></div>
        ))}
      </div>
      <div className="h-64 bg-card border border-border rounded-xl"></div>
    </div>
  );
}
