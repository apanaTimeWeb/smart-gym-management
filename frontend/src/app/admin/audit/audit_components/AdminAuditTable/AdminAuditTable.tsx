"use client";
import { useAdminAuditContext } from "@/app/admin/audit/audit_context/AdminAuditContext";
import AdminAuditEmptyState from "@/app/admin/audit/audit_components/AdminAuditEmptyState/AdminAuditEmptyState";
export default function AdminAuditTable() {
  const { logs, search, moduleFilter, actionFilter, loading } = useAdminAuditContext();
  const filtered = logs.filter(l => {
    const sm = search.toLowerCase();
    const matchSearch = !sm || l.performedBy.toLowerCase().includes(sm) || l.details.toLowerCase().includes(sm);
    const matchMod = moduleFilter === "All" || l.module === moduleFilter;
    const matchAct = actionFilter === "All" || l.action === actionFilter;
    return matchSearch && matchMod && matchAct;
  });

  const getActionColor = (action: string) => {
    switch (action) { case "CREATE": return "bg-success-bg text-success"; case "UPDATE": return "bg-warning-bg text-warning"; case "DELETE": return "bg-danger-bg text-danger"; default: return "bg-info-bg text-info"; }
  };

  if (loading) return <div className="space-y-2">{Array.from({length:8}).map((_,i) => <div key={i} className="h-12 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!filtered.length) return <AdminAuditEmptyState />;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-bg-page">{["Timestamp","User","Role","Module","Action","Details","IP Address"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-bg-overlay transition-colors">
                <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{new Date(l.timestamp).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{l.performedBy}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-border text-text-secondary rounded-full">{l.role}</span></td>
                <td className="px-4 py-3 font-semibold text-text-secondary">{l.module}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getActionColor(l.action)}`}>{l.action}</span></td>
                <td className="px-4 py-3 text-text-secondary text-xs truncate max-w-xs" title={l.details}>{l.details}</td>
                <td className="px-4 py-3 text-text-secondary font-mono text-xs">{l.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
