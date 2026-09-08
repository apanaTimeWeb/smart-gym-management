// RESPONSIBILITY: Module-level error boundary for the Schedule module.
'use client';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function ScheduleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => { console.error('Schedule module error:', error); }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border border-danger/20 rounded-xl p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Failed to load schedule</h3>
          <p className="text-sm text-secondary mt-1">{error.message || 'An unexpected error occurred while loading the trainer schedule.'}</p>
        </div>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-primary text-black font-medium rounded-md hover:bg-primary-hover motion-safe:transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
