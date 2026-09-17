"use client";
// RESPONSIBILITY: Renders/orchestrates error for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { ShieldAlert } from 'lucide-react';

export default function AdminAuditLogsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ShieldAlert size={40} className="text-danger opacity-60" />
      <p className="text-foreground font-semibold">Failed to load Audit Logs</p>
      <button onClick={reset} className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors">
        Try Again
      </button>
    </div>
  );
}