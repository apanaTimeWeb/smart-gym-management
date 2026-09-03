// RESPONSIBILITY: loading.tsx provides a skeleton fallback during initial SSR or client-side navigation.
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-64 bg-border motion-safe:animate-pulse rounded"></div>
        <div className="h-4 w-96 bg-border motion-safe:animate-pulse rounded mt-2"></div>
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm min-h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    </div>
  );
}
