'use client';
export default function AdminProfileError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-danger font-medium">Failed to load profile.</p>
      <button onClick={reset} className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-sm hover:bg-primary-hover motion-safe:transition-colors">
        Try Again
      </button>
    </div>
  );
}
