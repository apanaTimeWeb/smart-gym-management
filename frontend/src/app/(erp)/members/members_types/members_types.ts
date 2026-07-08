import { type Member, type Plan, type Payment } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/(erp)/erp_components/ErpMessageModal';
import type { ErpReceiptData } from '@/app/(erp)/erp_components/ErpThermalReceipt';
import { EMPTY_MEMBER_FORM } from '@/app/(erp)/members/members_utils/MembersSharedConstants';
import React from 'react';

export interface MembersContextType {
 members: Member[];
 plans: Plan[];
 payments: Payment[];
 stats: { total: number; active: number; pending: number; expired: number };
 loading: boolean;
 saving: boolean;
 
  search: string;
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
 form: typeof EMPTY_MEMBER_FORM;
 setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_MEMBER_FORM>>;
 
 // Actions
 openAdd: () => void;
 openEdit: (m: Member) => void;
 saveMember: (e: React.FormEvent) => Promise<void>;
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
