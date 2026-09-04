"use client";
// RESPONSIBILITY: Single source of truth for the Admin Members module state.
// DATA FLOW: adminMembersApi ? AdminMembersContext ? all members_components
// Manages: members list, stats, search/filter, modals, CRUD operations.
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminMembersApi } from "@/app/admin/members/members_api/admin_members_api";
import type { AdminMember, AdminMemberStats, AdminMembersContextType, FetchState } from "@/app/admin/members/members_types/admin_members_types";
import type { AdminMemberFormValues } from "@/app/admin/members/members_utils/AdminMembersSharedConstants";
import { ADMIN_EMPTY_MEMBER_FORM } from "@/app/admin/members/members_utils/AdminMembersSharedConstants";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";

const AdminMembersContext = createContext<AdminMembersContextType | null>(null);

export function AdminMembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [stats, setStats] = useState<AdminMemberStats | null>(null);
  const [loading, setLoading] = useState<FetchState>("loading");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const [profileTab, setProfileTab] = useState<"overview" | "attendance" | "payments">("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<AdminMemberFormValues | null>(null);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const loadMembers = useCallback(async () => {
    setLoading("loading");
    try {
      const [membersRes, statsRes] = await Promise.all([
        adminMembersApi.getAll({ status: statusFilter !== "All" ? statusFilter : "" }),
        adminMembersApi.getStats(),
      ]);
      if (membersRes.success) setMembers(membersRes.data.members);
      if (statsRes.success) setStats(statsRes.data);
      setLoading("success");
    } catch (err) {
      logger.error("[AdminMembers] Failed to load:", err);
      setLoading("error");
    }
  }, [statusFilter]);

  useEffect(() => { void loadMembers(); }, [loadMembers]);

  const openAdd = () => { setEditId(null); setEditData(ADMIN_EMPTY_MEMBER_FORM); setShowAddModal(true); };
  const openEdit = (m: AdminMember) => {
    setEditId(m.id);
    setEditData({ name: m.name, email: m.email || "", phone: m.phone, gender: m.gender as "MALE" | "FEMALE" | "OTHER", billingCycle: m.billingCycle, planId: m.planId, joinDate: m.joinDate, expiryDate: m.expiryDate, paidAmount: m.paidAmount, pendingAmount: m.pendingAmount });
    setShowAddModal(true);
  };
  const closeModal = () => { setShowAddModal(false); setEditId(null); setEditData(null); };

  const saveMember = async (data: AdminMemberFormValues) => {
    try {
      if (editId) { await adminMembersApi.update(editId, data); toast.success("Member updated successfully"); }
      else { await adminMembersApi.create(data); toast.success("Member added successfully"); }
      closeModal();
      void loadMembers();
    } catch (err) { logger.error("[AdminMembers] Save failed:", err); }
  };

  const deleteMember = async (id: string) => {
    try {
      await adminMembersApi.remove(id);
      toast.success("Member deleted");
      void loadMembers();
    } catch (err) { logger.error("[AdminMembers] Delete failed:", err); }
  };

  const renewMember = async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string }) => {
    if (!selectedMember) return;
    try {
      await adminMembersApi.renew(selectedMember.id, data);
      toast.success("Membership renewed");
      setShowRenewModal(false);
      void loadMembers();
    } catch (err) { logger.error("[AdminMembers] Renew failed:", err); }
  };

  const recordPayment = async (data: { amount: number; method: string }) => {
    if (!selectedMember) return;
    try {
      await adminMembersApi.update(selectedMember.id, { paidAmount: (selectedMember.paidAmount || 0) + data.amount, pendingAmount: Math.max(0, (selectedMember.pendingAmount || 0) - data.amount) });
      toast.success("Payment recorded");
      setShowPaymentModal(false);
      void loadMembers();
    } catch (err) { logger.error("[AdminMembers] Record payment failed:", err); }
  };

  return (
    <AdminMembersContext.Provider value={{ members, stats, loading, search, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage, selectedMember, setSelectedMember, profileTab, setProfileTab, showAddModal, editId, editData, openAdd, openEdit, closeModal, saveMember, deleteMember, showRenewModal, setShowRenewModal, showPaymentModal, setShowPaymentModal, renewMember, recordPayment }}>
      {children}
    </AdminMembersContext.Provider>
  );
}

export function useAdminMembersContext(): AdminMembersContextType {
  const ctx = useContext(AdminMembersContext);
  if (!ctx) throw new Error("useAdminMembersContext must be used within AdminMembersProvider");
  return ctx;
}
