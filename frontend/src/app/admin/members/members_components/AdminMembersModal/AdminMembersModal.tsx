"use client";
// RESPONSIBILITY: Add/Edit modal form for the Admin Members module.
// DATA FLOW: useAdminMembersContext ? form state ? saveMember()
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useAdminMembersContext } from "@/app/admin/members/members_context/AdminMembersContext";
import { AdminMemberSchema, ADMIN_GENDER_OPTIONS, ADMIN_MEMBERS_CYCLE_LABELS, type AdminMemberFormValues } from "@/app/admin/members/members_utils/AdminMembersSharedConstants";

export default function AdminMembersModal() {
  const { showAddModal, editId, editData, closeModal, saveMember } = useAdminMembersContext();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminMemberFormValues>({
    resolver: zodResolver(AdminMemberSchema),
    values: editData ?? undefined,
  });

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-text-primary">{editId ? "Edit Member" : "Add New Member"}</h2>
          <button onClick={closeModal} className="p-2 rounded-lg hover:bg-bg-overlay text-text-secondary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(saveMember)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name *", id: "name", type: "text", placeholder: "e.g. Rahul Sharma", error: errors.name?.message },
              { label: "Email", id: "email", type: "email", placeholder: "member@email.com", error: errors.email?.message },
              { label: "Phone *", id: "phone", type: "tel", placeholder: "10-digit mobile number", error: errors.phone?.message },
              { label: "Aadhaar", id: "aadhaar", type: "text", placeholder: "12-digit Aadhaar", error: errors.aadhaar?.message },
            ].map(f => (
              <div key={f.id}>
                <label className="text-sm font-medium text-text-secondary mb-1 block">{f.label}</label>
                <input
                  id={`admin-member-${f.id}`}
                  type={f.type}
                  placeholder={f.placeholder}
                  {...register(f.id as keyof AdminMemberFormValues)}
                  className="w-full px-3 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus transition-colors"
                />
                {f.error && <p className="text-xs text-danger mt-1">{f.error}</p>}
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Gender *</label>
              <select id="admin-member-gender" {...register("gender")} className="w-full px-3 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus">
                {ADMIN_GENDER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Billing Cycle *</label>
              <select id="admin-member-cycle" {...register("billingCycle")} className="w-full px-3 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus">
                {Object.entries(ADMIN_MEMBERS_CYCLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Join Date</label>
              <input id="admin-member-join-date" type="date" {...register("joinDate")} className="w-full px-3 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus" />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1 block">Expiry Date</label>
              <input id="admin-member-expiry-date" type="date" {...register("expiryDate")} className="w-full px-3 py-2 text-sm bg-bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-focus" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 rounded-lg border border-border text-text-secondary hover:bg-bg-overlay text-sm font-medium transition-colors">Cancel</button>
            <button
              id="admin-member-save-btn"
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-black font-semibold text-sm transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Saving�" : editId ? "Update Member" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
