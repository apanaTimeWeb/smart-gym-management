// RESPONSIBILITY: Renders the typed Manager grievance route error boundary and its retry action.
"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="m-4 sm:m-6 rounded-xl border border-danger bg-danger-bg p-6">
      <h2 className="text-base font-bold text-primary">Grievances could not be loaded</h2>
      <p className="mt-1 text-sm text-secondary">Please retry the Manager grievance screen.</p>
      <button type="button" onClick={reset} className="mt-4 min-h-11 rounded-lg bg-primary text-on-primary px-4 font-semibold">Try Again</button>
    </div>
  );
}
