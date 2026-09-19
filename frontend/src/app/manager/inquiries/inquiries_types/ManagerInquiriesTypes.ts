// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Inquiries module.

import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { ManagerInquiriesMessageType, ManagerInquiriesMessageRecipient } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesMessageTypes';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import type { ApiResponse } from '@/lib/api';

export interface ManagerInquiriesViewModel {
  // Query Data
  inquiries: Inquiry[];
  stats: InquiryStats | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  totalInquiries: number;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;

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
  selectedIds: string[];
  toggleSelectAll: (selectAll: boolean) => void;
  toggleSelectOne: (id: string) => void;
  clearSelection: () => void;

  // Modal State
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  editData: InquiryFormValues | null;
  saving: boolean;

  // Actions
  openAdd: () => void;
  openEdit: (inq: Inquiry) => void;
  saveInquiry: (data: InquiryFormValues) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<void>;

  // Message Modal State
  msgModal: { open: boolean; recipient: ManagerInquiriesMessageRecipient; type: ManagerInquiriesMessageType; message: string; subject?: string } | null;
  openMsg: (inq: Inquiry, type: ManagerInquiriesMessageType) => void;
  closeMsg: () => void;

  // Bulk Message Modal State
  bulkMsgModal: { open: boolean; type: ManagerInquiriesMessageType; recipients: ManagerInquiriesMessageRecipient[] } | null;
  openBulkMsg: (type: ManagerInquiriesMessageType) => void;
  closeBulkMsg: () => void;

  convertLead: Inquiry | null;
  convertLeadMutation: (args: { id: string; data: Record<string, unknown> }) => Promise<ApiResponse<{ memberId: string }>>;
  isConverting: boolean;
  openConvert: (inq: Inquiry) => void;
  closeConvert: () => void;
}

export interface Inquiry {
  id: string; name: string; phone: string; email?: string;
  interest: string; status: string; source?: string;
  notes?: string; followUpDate?: string; createdAt: string;
  followUpLogs?: { date: string; note: string }[];
}

export interface InquiryStats {
  total: number; new: number; followUp: number; converted: number; lost: number;
}
