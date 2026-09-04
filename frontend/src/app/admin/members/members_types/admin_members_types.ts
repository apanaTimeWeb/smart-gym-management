// RESPONSIBILITY: All TypeScript interfaces and types for the Admin Members module.
import type { AdminMemberFormValues } from "@/app/admin/members/members_utils/AdminMembersSharedConstants";

export type FetchState = "idle" | "loading" | "success" | "error";

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address?: string;
  aadhaar?: string;
  branch: string;
  planId: string;
  plan?: { id: string; name: string; tier: string };
  billingCycle: string;
  status: string;
  joinDate: string;
  expiryDate: string;
  paidAmount: number;
  pendingAmount: number;
  photo?: string;
  createdAt: string;
  assignedDietId?: string;
  assignedWorkoutId?: string;
}

export interface AdminMemberStats {
  total: number;
  active: number;
  pending: number;
  expired: number;
}

export interface AdminMembersContextType {
  members: AdminMember[];
  stats: AdminMemberStats | null;
  loading: FetchState;
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  selectedMember: AdminMember | null;
  setSelectedMember: (m: AdminMember | null) => void;
  profileTab: "overview" | "attendance" | "payments";
  setProfileTab: (tab: "overview" | "attendance" | "payments") => void;
  showAddModal: boolean;
  editId: string | null;
  editData: AdminMemberFormValues | null;
  openAdd: () => void;
  openEdit: (m: AdminMember) => void;
  closeModal: () => void;
  saveMember: (data: AdminMemberFormValues) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  showRenewModal: boolean;
  setShowRenewModal: (v: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (v: boolean) => void;
  renewMember: (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string }) => Promise<void>;
  recordPayment: (data: { amount: number; method: string }) => Promise<void>;
}
