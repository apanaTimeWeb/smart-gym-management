'use client';

export default function TrainerReportsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-10 text-center">
      <div className="w-14 h-14 bg-danger-bg text-danger rounded-full flex items-center justify-center mb-4 text-2xl">!</div>
      <h2 className="text-xl font-bold text-foreground mb-2">Reports failed to load</h2>
      <p className="text-sm text-secondary mb-6 max-w-sm">
        There was a problem loading your reports. Please try again.
      </p>
      <p className="text-xs text-secondary mb-6 font-mono">{error.digest}</p>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity"
      >
        Try Again
      </button>
    </div>
  );
}
