"use client";
// RESPONSIBILITY: Renders the paginated, filterable members table for the Admin role.
// DATA FLOW: useAdminMembersContext ? rows ? admin_members list actions
import { Eye, Pencil, Trash2, RefreshCw, IndianRupee } from "lucide-react";
import { useAdminMembersContext } from "@/app/admin/members/members_context/AdminMembersContext";
import AdminMembersEmptyState from "@/app/admin/members/members_components/AdminMembersEmptyState/AdminMembersEmptyState";
import { ADMIN_MEMBERS_STATUS_COLORS, ADMIN_MEMBERS_CYCLE_LABELS } from "@/app/admin/members/members_utils/AdminMembersSharedConstants";
import { formatCurrency, maskSensitiveData } from "@/lib/formatters";
import { useAdminConfirm } from "@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider";

export default function AdminMembersTable() {
  const { members, loading, search, statusFilter, setSelectedMember, openEdit, deleteMember, setShowRenewModal, setShowPaymentModal } = useAdminMembersContext();
  const { confirm } = useAdminConfirm();

  const filtered = members.filter(m => {
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.phone.includes(q);
    return matchStatus && matchSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ title: "Delete Member", message: `Are you sure you want to permanently delete ${name}? This action cannot be undone.`, confirmText: "Delete", type: "danger" });
    if (ok) await deleteMember(id);
  };

  if (loading === "loading") {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 bg-card border border-border rounded-xl motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  if (!filtered.length) return <AdminMembersEmptyState />;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-page">
              {["Member", "Phone", "Plan", "Status", "Cycle", "Paid", "Pending", "Expiry", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(m => {
              const statusStyle = ADMIN_MEMBERS_STATUS_COLORS[m.status] ?? { bg: "bg-border", text: "text-text-secondary" };
              return (
                <tr key={m.id} className="hover:bg-bg-overlay transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{m.name}</p>
                        <p className="text-xs text-text-secondary">{maskSensitiveData(m.email || "", "email")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary font-mono text-xs">{maskSensitiveData(m.phone, "phone")}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {m.plan?.name ?? m.planId}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{ADMIN_MEMBERS_CYCLE_LABELS[m.billingCycle] ?? m.billingCycle}</td>
                  <td className="px-4 py-3 font-semibold text-success text-sm">{formatCurrency(m.paidAmount)}</td>
                  <td className="px-4 py-3 font-semibold text-danger text-sm">{formatCurrency(m.pendingAmount)}</td>
                  <td className="px-4 py-3 text-xs text-text-secondary whitespace-nowrap">
                    {new Date(m.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        id={`view-member-${m.id}`}
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                        title="View Profile"
                      ><Eye className="w-3.5 h-3.5" /></button>
                      <button
                        id={`edit-member-${m.id}`}
                        onClick={() => openEdit(m)}
                        className="p-1.5 rounded-lg bg-info-bg hover:bg-info/20 text-info transition-colors"
                        title="Edit"
                      ><Pencil className="w-3.5 h-3.5" /></button>
                      <button
                        id={`renew-member-${m.id}`}
                        onClick={() => { setSelectedMember(m); setShowRenewModal(true); }}
                        className="p-1.5 rounded-lg bg-success-bg hover:bg-success/20 text-success transition-colors"
                        title="Renew"
                      ><RefreshCw className="w-3.5 h-3.5" /></button>
                      <button
                        id={`payment-member-${m.id}`}
                        onClick={() => { setSelectedMember(m); setShowPaymentModal(true); }}
                        className="p-1.5 rounded-lg bg-warning-bg hover:bg-warning/20 text-warning transition-colors"
                        title="Add Payment"
                      ><IndianRupee className="w-3.5 h-3.5" /></button>
                      <button
                        id={`delete-member-${m.id}`}
                        onClick={() => handleDelete(m.id, m.name)}
                        className="p-1.5 rounded-lg bg-danger-bg hover:bg-danger/20 text-danger transition-colors"
                        title="Delete"
                      ><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
