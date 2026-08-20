// RESPONSIBILITY: Defines all TypeScript types, interfaces, and the FetchState enum for the Members module. Single source of truth for member data shapes.
import type { Plan } from '@/app/admin/plans/plans_types/plans_types';
import type { Payment } from '@/app/admin/finance/finance_types/finance_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import type { MessageType, AdminMessageRecipient } from '@/app/admin/admin_components/AdminFeedback/AdminMessageModal';
import type { AdminReceiptData } from '@/app/admin/admin_components/AdminShared/AdminThermalReceipt';
import type { MemberFormValues } from '@/app/admin/members/members_utils/MembersSharedConstants';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface MembersInitialData {
  members: Member[];
  plans: Plan[];
  stats: MemberStats;
  totalMembers: number;
}

export interface Member {
  id: string; name: string; email: string; phone: string;
  gender: string; address?: string; branch: string;
  planId: string; plan?: { id: string; name: string; tier: string };
  billingCycle: string; status: string;
  joinDate: string; expiryDate: string;
  paidAmount: number; pendingAmount: number; photo?: string;
  createdAt: string;
}

export interface MemberStats {
  total: number; active: number; pending: number; expired: number;
}

/** Extends Plan with an optional per-day custom price used in the billing cycle calculator. */
export interface PlanWithCustom extends Plan {
  priceCustom?: number;
}

export interface MembersContextType {
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  toast: { message: string; type: ToastType } | null;
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;

  // Member Profile
  selectedMember: Member | null;
  setSelectedMember: (m: Member | null) => void;
  profileTab: 'overview' | 'attendance' | 'payments';
  setProfileTab: (tab: 'overview' | 'attendance' | 'payments') => void;

  // Add/Edit Modal
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editId: string | null;
  editData: MemberFormValues | null;

  // Actions
  openAdd: () => void;
  openEdit: (m: Member) => void;
  saveMember: (data: MemberFormValues) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;

  // Message Modal
  msgModal: { open: boolean; recipient: AdminMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (m: Member, type: MessageType) => void;
  closeMsg: () => void;

  // Receipt Printing
  printData: AdminReceiptData | null;
  handlePrint: (p: Payment) => void;
  setPrintData: (data: AdminReceiptData | null) => void;
}
