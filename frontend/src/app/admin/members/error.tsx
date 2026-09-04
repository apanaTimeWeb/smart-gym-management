"use client";
// RESPONSIBILITY: Error boundary for the Admin Members page.
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { logger } from "@/lib/logger";

export default function AdminMembersError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { logger.error("[AdminMembers] Module error:", error); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl m-6">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-danger" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Failed to load Members</h2>
      <p className="text-text-secondary text-sm max-w-md text-center mb-6">{error.message || "An unexpected error occurred."}</p>
      <button onClick={reset} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black px-6 py-2.5 rounded-lg font-semibold transition-colors">
        <RefreshCcw className="w-4 h-4" /> Try Again
      </button>
    </div>
  );
}
