"use client";
// RESPONSIBILITY: Renders/orchestrates error for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { ShieldAlert } from 'lucide-react';

export default function AdminAuditLogsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ShieldAlert size={40} className="text-danger opacity-60" />
      <p className="text-primary font-semibold">Failed to load Audit Logs</p>
      <button onClick={reset} className="px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        Try Again
      </button>
    </div>
  );
}