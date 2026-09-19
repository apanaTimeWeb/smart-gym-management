'use client';
// DATA FLOW: URL state → TanStack Query → Inquiries API; UI state → module-scoped Zustand; mutations → API → cache invalidation.
/** Coordinates the Manager / feature. */
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useManagerDebounce } from "@/app/manager/manager_infrastructure/ManagerDebounce";
import type { Inquiry, ManagerInquiriesViewModel } from "@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes";
import type { ManagerInquiriesMessageType } from "@/app/manager/inquiries/inquiries_types/ManagerInquiriesMessageTypes";
import { EMPTY_INQUIRY_FORM, type InquiryFormValues } from "@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes";
import { generateDefaultMessage } from "@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants";
import { useInquiriesQuery, useInquiryStatsQuery } from "@/app/manager/inquiries/inquiries_api/ManagerUseManagerInquiriesQueries";
import { useManagerInquiriesMutations } from "@/app/manager/inquiries/inquiries_api/ManagerUseManagerInquiriesMutations";
import { buildManagerInquiriesQueryParams } from "@/app/manager/inquiries/inquiries_hooks/ManagerBuildInquiriesQueryParams";
import { useManagerInquiriesUiStore } from "@/app/manager/inquiries/inquiries_store/ManagerUseManagerInquiriesUiStore";

export function useManagerInquiriesLogic(): ManagerInquiriesViewModel {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerInquiriesUiStore();
  const search = searchParams.get("search") || ""; const statusFilter = searchParams.get("status") || "All"; const dateFilter = searchParams.get("date") || "all"; const currentPage = Number(searchParams.get("page") || "1");
  const debouncedSearch = useManagerDebounce(search, 300);
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString()); if (value && !(key === "status" && value === "All") && !(key === "date" && value === "all")) params.set(key, value); else params.delete(key); if (key !== "page") params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const queryParams = buildManagerInquiriesQueryParams({ currentPage, debouncedSearch, statusFilter, dateFilter });
  const listQuery = useInquiriesQuery(queryParams); const statsQuery = useInquiryStatsQuery();
  const inquiries = listQuery.data?.inquiries ?? [];
  const errorMessage = listQuery.isError ? (listQuery.error instanceof Error ? listQuery.error.message : MANAGER_GENERIC_ERROR_MESSAGE) : '';
  const { createInquiry, updateInquiry, deleteInquiry: removeInquiry, convertLead: convertLeadMutation, isCreating, isUpdating, isConverting } = useManagerInquiriesMutations({ showToast: ui.showToast, onSuccessCallback: () => { ui.setShowModal(false); ui.setConvertLead(null); } });
  const openAdd = useCallback(() => { ui.setEditId(null); ui.setEditData(EMPTY_INQUIRY_FORM as InquiryFormValues); ui.setShowModal(true); }, [ui]);
  const openEdit = useCallback((inq: Inquiry) => { ui.setEditId(inq.id); ui.setEditData({ name: inq.name, phone: inq.phone, email: inq.email || "", interest: inq.interest, status: inq.status as InquiryFormValues["status"], source: inq.source || "Walk-in", notes: inq.notes || "" }); ui.setShowModal(true); }, [ui]);
  const saveInquiry = useCallback(async (data: InquiryFormValues) => { if (ui.editId) updateInquiry({ id: ui.editId, data }); else createInquiry(data); }, [createInquiry, ui.editId, updateInquiry]);
  const deleteInquiry = useCallback(async (id: string) => { await removeInquiry({ id, idempotencyKey: crypto.randomUUID() }); }, [removeInquiry]);
  const updateStatus = useCallback(async (id: string, status: string) => { updateInquiry({ id, data: { status: status as InquiryFormValues["status"] } }); }, [updateInquiry]);
  const openMsg = useCallback((inq: Inquiry, type: ManagerInquiriesMessageType) => { ui.setMsgModal({ open: true, type, recipient: { name: inq.name, phone: inq.phone, email: inq.email || "" }, message: generateDefaultMessage(inq.name, inq.interest) }); }, [ui]);
  const openBulkMsg = useCallback((type: ManagerInquiriesMessageType) => { const recipients = inquiries.filter((inq) => ui.selectedIds.includes(inq.id)).map((inq) => ({ name: inq.name, phone: inq.phone, email: inq.email || "" })); ui.setBulkMsgModal({ open: true, type, recipients }); }, [inquiries, ui]);
  const toggleSelectAll = useCallback((selectAll: boolean) => ui.setSelectedIds(selectAll ? inquiries.map((inq) => inq.id) : []), [inquiries, ui]);
  const toggleSelectOne = useCallback((id: string) => ui.setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]), [ui]);
  const openConvert = useCallback((inq: Inquiry) => ui.setConvertLead(inq), [ui]);
  return {
    inquiries, stats: statsQuery.data ?? null, isLoading: listQuery.isLoading || statsQuery.isLoading, isError: listQuery.isError, errorMessage, totalInquiries: listQuery.data?.total ?? 0, toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast,
    search, debouncedSearch, setSearch: (value) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value) => setUrlParam("status", value), dateFilter, setDateFilter: (value) => setUrlParam("date", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)),
    selectedIds: ui.selectedIds, toggleSelectAll, toggleSelectOne, clearSelection: () => ui.setSelectedIds([]), showModal: ui.showModal, setShowModal: ui.setShowModal, editId: ui.editId, editData: ui.editData, saving: isCreating || isUpdating, openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal: ui.msgModal, openMsg, closeMsg: () => ui.setMsgModal(null), bulkMsgModal: ui.bulkMsgModal, openBulkMsg, closeBulkMsg: () => ui.setBulkMsgModal(null), convertLead: ui.convertLead, openConvert, closeConvert: () => ui.setConvertLead(null), convertLeadMutation, isConverting };
}
