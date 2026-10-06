import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';
import type { MemberType, MemberStatsType } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersDerivedTypes';
import type { ManagerMembersMessageType, ManagerMembersMessageRecipient } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersMessageTypes';
import type { PlanSnapshot, PaymentSnapshot, DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersSnapshotTypes';
import type { ManagerMembersReceiptData } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersThermalReceiptTypes';


export type MemberSortColumn = 'name' | 'joinDate' | 'expiryDate' | 'paidAmount' | 'status';
export type SortDirection = 'asc' | 'desc';
export type ManagerMembersPaymentMethod = 'UPI' | 'Cash' | 'Card' | 'NetBanking';
export type ManagerMembersKpiKey = 'total' | 'active' | 'pending' | 'expired';
export type ExportFormat = 'csv' | 'pdf';
export type MemberProfileTab = 'overview' | 'attendance' | 'payments' | 'workout' | 'diet';

export interface MembersInitialData {
  members: Member[];
  plans: PlanSnapshot[];
  stats: MemberStats;
  totalMembers: number;
}

export type DietPlan = DietPlanSnapshot;
export type Workout = WorkoutSnapshot;
export type Payment = PaymentSnapshot;

// ─── Member ───────────────────────────────────────────────────────────────────
export interface MemberEmergencyContact {
  name: string;
  phone: string;
}

export interface Member extends Omit<MemberType, 'assignedDiet' | 'assignedWorkout' | 'plan'> {
  plan?: PlanSnapshot;
  recentPayments?: PaymentSnapshot[];
  dietPlan?: DietPlanSnapshot;
  workoutPlan?: WorkoutSnapshot;
  assignedDiet?: DietPlanSnapshot;
  assignedWorkout?: WorkoutSnapshot;
}

// ─── Member Stats ─────────────────────────────────────────────────────────────
export type MemberStats = MemberStatsType;

/** Extends Plan with an optional per-day custom price used in the billing cycle calculator. */
export type PlanWithCustom = PlanSnapshot;

// ─── Context ──────────────────────────────────────────────────────────────────
export interface ManagerMembersViewModel {
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  // CRITICAL — backend API needs these query params
  genderFilter: string;
  setGenderFilter: (s: string) => void;
  planFilter: string;
  setPlanFilter: (s: string) => void;
  expiryFrom: string;
  expiryTo: string;
  setExpiryRange: (from: string, to: string) => void;
  // Sort state (needed for sortable column headers — Rule 30)
  sortColumn: MemberSortColumn;
  sortDirection: SortDirection;
  setSortColumn: (col: MemberSortColumn) => void;
  setSortDirection: (dir: SortDirection) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;

  // Member Profile
  selectedMember: Member | null;
  setSelectedMember: (m: Member | null) => void;
  profileTab: MemberProfileTab;
  setProfileTab: (tab: MemberProfileTab) => void;

  // Add/Edit Modal
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editId: string | null;
  editData: MemberFormValues | null;

  // Renew Modal
  showRenewModal: boolean;
  setShowRenewModal: (show: boolean) => void;

  // Add Payment Modal
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;

  // Actions
  openAdd: () => void;
  openEdit: (m: Member) => void;
  saveMember: (data: MemberFormValues, idempotencyKey: string) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  assignDiet: (memberId: string, diet: DietPlan | null) => Promise<void> ;
  assignWorkout: (memberId: string, workout: Workout | null) => Promise<void>;
  renewMember: (data: {
    planId: string;
    newExpiryDate: string;
    amountPaid: number;
    paymentMethod: string;
    billingCycle: string;
    customDays?: number;
  }, idempotencyKey: string) => Promise<void>;
  recordPayment: (data: { amount: number; method: string }, idempotencyKey: string) => Promise<void>;
  freezeMember: (isFrozen: boolean, freezeUntil?: string) => Promise<void>;
  toggleSuspend: (isSuspended: boolean) => Promise<void>;
  assignTrainer: (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => Promise<void>;

  // Message Modal
  msgModal: { open: boolean; recipient: ManagerMembersMessageRecipient; type: ManagerMembersMessageType; message: string; subject?: string } | null;
  openMsg: (m: Member, type: ManagerMembersMessageType) => void;
  closeMsg: () => void;

  // Receipt Printing
  printData: ManagerMembersReceiptData | null;
  handlePrint: (p: Payment) => void;
  handleSharePaymentWhatsApp: (p: Payment) => void;
  setPrintData: (data: ManagerMembersReceiptData | null) => void;
  exportMembers: (format: ExportFormat) => Promise<void>;
}
