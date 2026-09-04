"use client";
import { useEffect } from "react"; import { AlertTriangle, RefreshCcw } from "lucide-react"; import { logger } from "@/lib/logger";
export default function AdminAuditError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { logger.error("[AdminAudit] Error:", error); }, [error]);
  return <div className="flex flex-col items-center justify-center min-h-96 m-6 bg-card border border-border rounded-xl p-8"><AlertTriangle className="w-10 h-10 text-danger mb-4" /><h2 className="text-xl font-bold text-text-primary mb-2">Failed to load Audit Logs</h2><button onClick={reset} className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-lg font-semibold mt-4"><RefreshCcw className="w-4 h-4" /> Try Again</button></div>;
}
