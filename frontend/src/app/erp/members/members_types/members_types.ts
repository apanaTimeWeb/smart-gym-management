// RESPONSIBILITY: Contains logic, types, or component definition for this module.
import type { Plan } from '@/app/erp/plans/plans_types/plans_types';
import type { Payment } from '@/app/erp/finance/finance_types/finance_types';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { EMPTY_MEMBER_FORM, MemberFormValues } from '@/app/erp/members/members_utils/MembersSharedConstants';
import React from 'react';

export enum FetchState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface MembersInitialData {
  members: Member[];
  plans: Plan[];
  stats: MemberStats;
  totalMembers: number;
}

export interface MembersContextType {
 members: Member[];
 plans: Plan[];
 payments: Payment[];
 stats: { total: number; active: number; pending: number; expired: number };
 fetchState: FetchState;
 saving: boolean;
 totalMembers: number;
 
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
 
 loadAll: () => Promise<void>;
 
 // Member Profile
 selectedMember: Member | null;
 setSelectedMember: (m: Member | null) => void;
 profileTab: 'overview' | 'attendance' | 'payments';
 setProfileTab: (tab: 'overview' | 'attendance' | 'payments') => void;
 loadMemberProfile: (id: number) => Promise<void>;
 
 // Attendance
 attMap: Record<number, { day: number; status: string }[]>;
 getAtt: (id: number) => { day: number; status: string }[];
 toggleAtt: (memberId: number, day: number) => void;
 
 // Add/Edit Modal
 showAddModal: boolean;
 setShowAddModal: (show: boolean) => void;
 editId: number | null;
 editData: MemberFormValues | null;
 
 // Actions
 openAdd: () => void;
 openEdit: (m: Member) => void;
 saveMember: (data: MemberFormValues) => Promise<void>;
 deleteMember: (id: number) => Promise<void>;
 
 // Message Modal
 msgModal: { open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null;
 openMsg: (m: Member, type: MessageType) => void;
 closeMsg: () => void;
 
 // Receipt Printing
 printData: ErpReceiptData | null;
 handlePrint: (p: Payment) => void;
 setPrintData: (data: ErpReceiptData | null) => void;
}

export interface Member {
  id: number; name: string; email: string; phone: string;
  gender: string; address?: string; branch: string;
  planId: number; plan?: { id: number; name: string; tier: string };
  billingCycle: string; status: string;
  joinDate: string; expiryDate: string;
  paidAmount: number; pendingAmount: number; photo?: string;
  createdAt: string;
}
export interface MemberStats {
  total: number; active: number; pending: number; expired: number;
}

