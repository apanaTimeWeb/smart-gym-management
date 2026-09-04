"use client";
import { Pencil, Trash2, ArrowUpRight } from "lucide-react";
import { useAdminInquiriesContext } from "@/app/admin/inquiries/inquiries_context/AdminInquiriesContext";
import { ADMIN_INQUIRY_STATUS_OPTIONS, ADMIN_INQUIRY_SOURCES } from "@/app/admin/inquiries/inquiries_utils/AdminInquiriesSharedConstants";
import type { AdminInquiry } from "@/app/admin/inquiries/inquiries_types/admin_inquiries_types";

export default function AdminInquiriesTable() {
  const { inquiries, search, statusFilter, loading, openEdit, remove, updateStatus } = useAdminInquiriesContext();
  const filtered = inquiries.filter(i => {
    const matchStatus = statusFilter === "All" || i.status === statusFilter;
    const q = search.toLowerCase();
    return matchStatus && (!q || i.name.toLowerCase().includes(q) || i.phone.includes(q));
  });

  const getStatusStyle = (status: string) => ADMIN_INQUIRY_STATUS_OPTIONS.find(o => o.value === status)?.className ?? "bg-border text-text-secondary";
  const getSourceLabel = (source: string) => ADMIN_INQUIRY_SOURCES.find(s => s.value === source)?.label ?? source;

  if (loading) return <div className="space-y-2">{Array.from({length: 5}).map((_,i) => <div key={i} className="h-12 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!filtered.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No inquiries match your filters.</div>;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-bg-page">
            {["Name", "Phone", "Source", "Interest", "Status", "Created", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map(i => (
              <tr key={i.id} className="hover:bg-bg-overlay transition-colors">
                <td className="px-4 py-3 font-semibold text-text-primary">{i.name}</td>
                <td className="px-4 py-3 text-text-secondary font-mono text-xs">{i.phone}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-purple-bg text-purple rounded-full font-medium">{getSourceLabel(i.source)}</span></td>
                <td className="px-4 py-3 text-text-secondary text-xs">{i.interest || "�"}</td>
                <td className="px-4 py-3">
                  <select value={i.status} onChange={e => void updateStatus(i.id, e.target.value as AdminInquiry["status"])}
                    className={`text-xs px-2 py-0.5 rounded-full font-bold border-0 cursor-pointer ${getStatusStyle(i.status)}`}>
                    {ADMIN_INQUIRY_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs">{new Date(i.createdAt).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(i)} className="p-1.5 rounded-lg bg-info-bg text-info hover:bg-info/20 transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => void remove(i.id)} className="p-1.5 rounded-lg bg-danger-bg text-danger hover:bg-danger/20 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    {i.status === "converted" && <button className="p-1.5 rounded-lg bg-success-bg text-success hover:bg-success/20 transition-colors" title="Convert to Member"><ArrowUpRight className="w-3.5 h-3.5" /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
