import { type Inquiry, type InquiryStats } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/(erp)/erp_components/ErpMessageModal';
import { EMPTY_INQUIRY_FORM } from '../inquiries_utils/InquiriesSharedConstants';
import React from 'react';

export interface InquiriesContextType {
 inquiries: Inquiry[];
 stats: InquiryStats | null;
 loading: boolean;
 error: string;
 toast: { message: string; type: ToastType } | null;
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 loadAll: () => Promise<void>;
 
 search: string;
 setSearch: (s: string) => void;
 statusFilter: string;
 setStatusFilter: (s: string) => void;
 dateFilter: string;
 setDateFilter: (s: string) => void;
 
 // Modal State
 showModal: boolean;
 setShowModal: (show: boolean) => void;
 editId: number | null;
 form: typeof EMPTY_INQUIRY_FORM;
 setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_INQUIRY_FORM>>;
 saving: boolean;
 
 // Actions
 openAdd: () => void;
 openEdit: (inq: Inquiry) => void;
 saveInquiry: (e: React.FormEvent) => Promise<void>;
 deleteInquiry: (id: number) => Promise<void>;
 updateStatus: (id: number, status: string) => Promise<void>;
 
 // Message Modal State
 msgModal: { open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null;
 openMsg: (inq: Inquiry, type: MessageType) => void;
 closeMsg: () => void;
}
