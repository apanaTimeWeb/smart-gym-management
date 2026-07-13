// RESPONSIBILITY: inquiries_types.ts handles the logic and UI for its corresponding feature.

import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import { EMPTY_INQUIRY_FORM } from '@/app/erp/inquiries/inquiries_utils/InquiriesSharedConstants';
import React from 'react';

export interface InquiriesContextType {
 inquiries: Inquiry[];
 stats: InquiryStats | null;
 loading: boolean;
 error: string;
 totalInquiries: number;
 toast: { message: string; type: ToastType } | null;
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 loadAll: () => Promise<void>;
 
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  dateFilter: string;
  setDateFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
 
  // Selection State
  selectedIds: number[];
  toggleSelectAll: (selectAll: boolean) => void;
  toggleSelectOne: (id: number) => void;
  clearSelection: () => void;
 
 // Modal State
 showModal: boolean;
 setShowModal: (show: boolean) => void;
 editId: number | null;
 editData: any;
 saving: boolean;
 
 // Actions
 openAdd: () => void;
 openEdit: (inq: Inquiry) => void;
 saveInquiry: (data: any) => Promise<void>;
 deleteInquiry: (id: number) => Promise<void>;
 updateStatus: (id: number, status: string) => Promise<void>;
 
  // Message Modal State
  msgModal: { open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (inq: Inquiry, type: MessageType) => void;
  closeMsg: () => void;

  // Bulk Message Modal State
  bulkMsgModal: { open: boolean; type: MessageType; recipients: ErpMessageRecipient[] } | null;
  openBulkMsg: (type: MessageType) => void;
  closeBulkMsg: () => void;
}

export interface Inquiry {
  id: number; name: string; phone: string; email?: string;
  interest: string; status: string; source?: string;
  notes?: string; followUpDate?: string; createdAt: string;
}
export interface InquiryStats {
  total: number; new: number; followUp: number; converted: number; lost: number;
}
