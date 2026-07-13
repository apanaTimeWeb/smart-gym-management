'use client';
// RESPONSIBILITY: Error boundary for the Server Infrastructure page.
export default function InfrastructureError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <p className="text-danger font-semibold">Failed to load Infrastructure metrics.</p>
      <button onClick={reset} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">Retry</button>
    </div>
  );
}
