'use client';
import { AlertTriangle } from 'lucide-react';

export default function CommunicationsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-6">
      <div className="w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center">
        <AlertTriangle size={24} className="text-danger" />
      </div>
      <h2 className="text-lg font-bold text-foreground">Failed to load Communications</h2>
      <p className="text-sm text-secondary max-w-sm">Something went wrong while loading the communications module. Your data is safe.</p>
      <button onClick={reset} className="px-5 py-2 bg-primary text-black rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity">
        Try Again
      </button>
    </div>
  );
}
