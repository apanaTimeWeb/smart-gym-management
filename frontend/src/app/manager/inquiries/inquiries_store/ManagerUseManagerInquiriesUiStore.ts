"use client";
/** Coordinates the Manager / feature. */
import { create } from "zustand";
import type { Inquiry } from "@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes";
import type { InquiryFormValues } from "@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes";
import type { ManagerInquiriesMessageType, ManagerInquiriesMessageRecipient } from "@/app/manager/inquiries/inquiries_types/ManagerInquiriesMessageTypes";
import type { ManagerToastType } from "@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes";

type ManagerInquiriesMessageModal = { open: boolean; recipient: ManagerInquiriesMessageRecipient; type: ManagerInquiriesMessageType; message: string; subject?: string };
type ManagerInquiriesBulkMessageModal = { open: boolean; type: ManagerInquiriesMessageType; recipients: ManagerInquiriesMessageRecipient[] };
interface ManagerInquiriesUiState {
  toast: { message: string; type: ManagerToastType } | null;
  showModal: boolean; editId: string | null; editData: InquiryFormValues | null;
  msgModal: ManagerInquiriesMessageModal | null; bulkMsgModal: ManagerInquiriesBulkMessageModal | null;
  convertLead: Inquiry | null; selectedIds: string[];
  showToast: (message: string, type: ManagerToastType) => void; hideToast: () => void;
  setShowModal: (show: boolean) => void; setEditId: (id: string | null) => void; setEditData: (data: InquiryFormValues | null) => void;
  setMsgModal: (value: ManagerInquiriesMessageModal | null) => void; setBulkMsgModal: (value: ManagerInquiriesBulkMessageModal | null) => void;
  setConvertLead: (value: Inquiry | null) => void; setSelectedIds: (ids: string[] | ((current: string[]) => string[])) => void;
}
export const useManagerInquiriesUiStore = create<ManagerInquiriesUiState>((set) => ({
  toast: null, showModal: false, editId: null, editData: null, msgModal: null, bulkMsgModal: null, convertLead: null, selectedIds: [],
  showToast: (message, type) => set({ toast: { message, type } }), hideToast: () => set({ toast: null }),
  setShowModal: (showModal) => set({ showModal }), setEditId: (editId) => set({ editId }), setEditData: (editData) => set({ editData }),
  setMsgModal: (msgModal) => set({ msgModal }), setBulkMsgModal: (bulkMsgModal) => set({ bulkMsgModal }), setConvertLead: (convertLead) => set({ convertLead }),
  setSelectedIds: (next) => set((state) => ({ selectedIds: typeof next === "function" ? next(state.selectedIds) : next })) }));
