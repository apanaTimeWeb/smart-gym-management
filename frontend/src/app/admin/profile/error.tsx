"use client";
// RESPONSIBILITY: Renders/orchestrates error for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
export default function AdminProfileError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-danger font-medium">Failed to load profile.</p>
      <button onClick={reset} className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg text-sm hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        Try Again
      </button>
    </div>
  );
}