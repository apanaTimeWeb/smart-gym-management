// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Members module.
// Single source of truth for member data shapes.
// CRITICAL additions: freezeUntil, emergencyContact, referralCode, bloodGroup, membershipNumber,
// genderFilter, planFilter, expiryRange — all required for filter/export API params and DB schema.

import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { MessageType, ManagerMessageRecipient } from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';
import type { ManagerReceiptData } from '@/app/manager/manager_components/ManagerFeedback/ManagerThermalReceipt';
import type { MemberFormValues } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { MemberType, MemberStatsType } from '@/app/manager/members/members_types/ManagerMembers.schema';
import type { PlanSnapshot, PaymentSnapshot, DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';

export type MemberSortColumn = 'name' | 'joinDate' | 'expiryDate' | 'paidAmount' | 'status';
export type SortDirection = 'asc' | 'desc';
export type ExportFormat = 'csv' | 'pdf';

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
export interface MembersContextType {
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

  toast: { message: string; type: ToastType } | null;
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;

  // Member Profile
  selectedMember: Member | null;
  setSelectedMember: (m: Member | null) => void;
  profileTab: 'overview' | 'attendance' | 'payments' | 'workout' | 'diet';
  setProfileTab: (tab: 'overview' | 'attendance' | 'payments' | 'workout' | 'diet') => void;

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
  saveMember: (data: MemberFormValues) => Promise<{ id?: string; message?: string }>;
  deleteMember: (id: string) => Promise<void>;
  assignDiet: (memberId: string, diet: DietPlan | null) => Promise<unknown> ;
  assignWorkout: (memberId: string, workout: Workout | null) => Promise<unknown>;
  renewMember: (data: {
    planId: string;
    newExpiryDate: string;
    amountPaid: number;
    paymentMethod: string;
    billingCycle: string;
    customDays?: number;
  }) => Promise<unknown>;
  recordPayment: (data: { amount: number; method: string }) => Promise<unknown>;
  freezeMember: (isFrozen: boolean, freezeUntil?: string) => Promise<unknown>;
  toggleSuspend: (isSuspended: boolean) => Promise<unknown>;
  assignTrainer: (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => Promise<unknown>;

  // Message Modal
  msgModal: { open: boolean; recipient: ManagerMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (m: Member, type: MessageType) => void;
  closeMsg: () => void;

  // Receipt Printing
  printData: ManagerReceiptData | null;
  handlePrint: (p: Payment) => void;
  handleSharePaymentWhatsApp: (p: Payment) => void;
  setPrintData: (data: ManagerReceiptData | null) => void;
}
