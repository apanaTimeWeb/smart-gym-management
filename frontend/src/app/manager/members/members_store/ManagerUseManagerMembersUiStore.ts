'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { Member, MemberProfileTab } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { MemberFormValues } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { ManagerMembersMessageType, ManagerMembersMessageRecipient } from '@/app/manager/members/members_types/ManagerMembersMessageTypes';
import type { ManagerMembersReceiptData } from '@/app/manager/members/members_types/ManagerMembersThermalReceiptTypes';
import { EMPTY_MEMBER_FORM } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';

interface ManagerMembersUiState {
  showAddModal: boolean; showRenewModal: boolean; showPaymentModal: boolean;
  editId: string | null; editData: MemberFormValues | null;
  selectedMemberId: string | null; profileTab: MemberProfileTab;
  msgModal: { open: boolean; recipient: ManagerMembersMessageRecipient; type: ManagerMembersMessageType; message: string; subject?: string } | null;
  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerMembersReceiptData | null;
  setShowAddModal: (value: boolean) => void; setShowRenewModal: (value: boolean) => void; setShowPaymentModal: (value: boolean) => void;
  setEditId: (value: string | null) => void; setEditData: (value: MemberFormValues | null) => void;
  setSelectedMemberId: (value: string | null) => void; setProfileTab: (value: MemberProfileTab) => void;
  setMsgModal: (value: ManagerMembersUiState['msgModal']) => void; setToast: (value: ManagerMembersUiState['toast']) => void;
  setPrintData: (value: ManagerMembersReceiptData | null) => void;
  showToast: (message: string, type: ManagerToastType) => void; hideToast: () => void;
  openAdd: () => void; openEdit: (member: Member) => void; closeMsg: () => void;
}

export const useManagerMembersUiStore = create<ManagerMembersUiState>((set) => ({
  showAddModal: false, showRenewModal: false, showPaymentModal: false, editId: null, editData: null,
  selectedMemberId: null, profileTab: 'overview', msgModal: null, toast: null, printData: null,
  setShowAddModal: (showAddModal) => set({ showAddModal }), setShowRenewModal: (showRenewModal) => set({ showRenewModal }), setShowPaymentModal: (showPaymentModal) => set({ showPaymentModal }),
  setEditId: (editId) => set({ editId }), setEditData: (editData) => set({ editData }), setSelectedMemberId: (selectedMemberId) => set({ selectedMemberId }), setProfileTab: (profileTab) => set({ profileTab }),
  setMsgModal: (msgModal) => set({ msgModal }), setToast: (toast) => set({ toast }), setPrintData: (printData) => set({ printData }),
  showToast: (message, type) => set({ toast: { message, type } }), hideToast: () => set({ toast: null }),
  openAdd: () => set({ editId: null, editData: EMPTY_MEMBER_FORM, showAddModal: true }),
  openEdit: (member) => set({ editId: member.id, editData: {
    name: member.name, email: member.email || '', phone: member.phone, address: member.address || '', aadhaar: member.aadhaar || '', medicalHistory: member.medicalHistory || '',
    gender: (member.gender || 'MALE') as MemberFormValues['gender'], billingCycle: member.billingCycle, customDays: 0, planId: String(member.planId),
    joinDate: member.joinDate ? member.joinDate.split('T')[0] : '', expiryDate: member.expiryDate ? member.expiryDate.split('T')[0] : '',
    paidAmount: member.paidAmount || 0, totalAmount: (member.paidAmount || 0) + (member.pendingAmount || 0)
  }, showAddModal: true }),
  closeMsg: () => set({ msgModal: null }) }));
