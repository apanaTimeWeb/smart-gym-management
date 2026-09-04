"use client";
import { Activity } from "lucide-react";
export default function AdminAuditEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-card border border-border rounded-xl">
      <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center mb-4"><Activity className="w-8 h-8 text-text-secondary" /></div>
      <h3 className="text-lg font-bold text-text-primary mb-2">No Audit Logs</h3>
      <p className="text-text-secondary text-sm">No activity logs found matching the current filters.</p>
    </div>
  );
}
