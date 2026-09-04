"use client";
// RESPONSIBILITY: Attendance records table for the Admin module.
import { useAdminAttendanceContext } from "@/app/admin/attendance/attendance_context/AdminAttendanceContext";

export default function AdminAttendanceTable() {
  const { records, filter, loading } = useAdminAttendanceContext();
  const filtered = filter === "all" ? records : records.filter(r => r.type === filter);

  if (loading) return <div className="space-y-2">{Array.from({length: 5}).map((_,i) => <div key={i} className="h-12 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!filtered.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No attendance records for today.</div>;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-bg-page">
            {["Name", "Type", "Date", "Check-In", "Check-Out", "Branch", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-bg-overlay transition-colors">
                <td className="px-4 py-3 font-medium text-text-primary">{r.name}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type === "member" ? "bg-primary/10 text-primary" : "bg-info-bg text-info"}`}>{r.type}</span></td>
                <td className="px-4 py-3 text-text-secondary text-xs">{new Date(r.date).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3 text-success font-mono text-xs">{r.checkIn}</td>
                <td className="px-4 py-3 text-text-secondary font-mono text-xs">{r.checkOut ?? "�"}</td>
                <td className="px-4 py-3 text-text-secondary text-xs">{r.branch}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${r.status === "present" ? "bg-success-bg text-success" : r.status === "late" ? "bg-warning-bg text-warning" : "bg-danger-bg text-danger"}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
