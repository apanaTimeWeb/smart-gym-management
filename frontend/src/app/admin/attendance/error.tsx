"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { logger } from "@/lib/logger";
export default function AdminAttendanceError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { logger.error("[AdminAttendance] Error:", error); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl m-6">
      <AlertTriangle className="w-10 h-10 text-danger mb-4" />
      <h2 className="text-xl font-bold text-text-primary mb-2">Failed to load Attendance</h2>
      <p className="text-text-secondary text-sm mb-6">{error.message}</p>
      <button onClick={reset} className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-lg font-semibold"><RefreshCcw className="w-4 h-4" /> Try Again</button>
    </div>
  );
}
