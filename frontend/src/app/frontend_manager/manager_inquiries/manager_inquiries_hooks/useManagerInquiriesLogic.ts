'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useRef } from "react";
import { useTranslations } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useManagerDebounce } from "@/app/frontend_manager/manager_infrastructure/useManagerDebounce";
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { MANAGER_INQUIRIES_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import { generateDefaultMessage } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesSharedConstants";
import { ManagerInquiriesBuildQueryParams } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_utils/ManagerInquiriesBuildQueryParams";
import { useManagerInquiriesMutations } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesMutations";
import { useInquiriesQuery, useInquiryStatsQuery } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesQueries";
import { useManagerInquiriesUiStore } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_store/useManagerInquiriesUiStore";
import { EMPTY_INQUIRY_FORM } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes";
import type { InquiryFormValues } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes";
import type { ManagerInquiriesMessageType } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesMessageTypes";
import type { Inquiry, ManagerInquiriesViewModel } from "@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesTypes";


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesLogic.
 * @dependencies Uses ManagerInquiriesBuildQueryParams, useManagerInquiriesMutations, useManagerInquiriesQueries, useManagerInquiriesUiStore.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/**
 * @description Owns Manager Inquiries list filters, pagination, selection, and inquiry workflow coordination.
 * @dependencies Delegates API/server state to feature-owned query and mutation hooks.
 * @edge-case Resets pagination when filters change and preserves selected inquiry identity across refreshes.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesLogic owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesLogic(): ManagerInquiriesViewModel {
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const t = useTranslations('MANAGER_INQUIRIES');
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerInquiriesUiStore();
  const search = searchParams.get("search") || ""; const statusFilter = searchParams.get("status") || MANAGER_INQUIRIES_STATUS_VALUES.ALL_FILTER; const dateFilter = searchParams.get("date") || "all"; const currentPage = Number(searchParams.get("page") || "1");
  const debouncedSearch = useManagerDebounce(search, 300);
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString()); if (value && !(key === "status" && value === MANAGER_INQUIRIES_STATUS_VALUES.ALL_FILTER) && !(key === "date" && value === "all")) params.set(key, value); else params.delete(key); if (key !== "page") params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const queryParams = ManagerInquiriesBuildQueryParams({ currentPage, debouncedSearch, statusFilter, dateFilter });
  const listQuery = useInquiriesQuery(queryParams); const statsQuery = useInquiryStatsQuery();
  const refresh = useCallback(async () => { await Promise.all([listQuery.refetch(), statsQuery.refetch()]); }, [listQuery.refetch, statsQuery.refetch]);
  const inquiries = listQuery.data?.inquiries ?? [];
  const errorMessage = (() => { if (listQuery.isError) { return (listQuery.error instanceof Error ? listQuery.error.message : t("TEXT_GENERIC_ERROR")); } return ''; })();
  const { createInquiry, updateInquiry, deleteInquiry: removeInquiry, convertLead: convertLeadMutation, isCreating, isUpdating, isConverting } = useManagerInquiriesMutations({ showToast: ui.showToast, onSuccessCallback: () => { ui.setShowModal(false); ui.setConvertLead(null); } });
  const openAdd = useCallback(() => { ui.setEditId(null); ui.setEditData(EMPTY_INQUIRY_FORM as InquiryFormValues); ui.setShowModal(true); }, [ui]);
  const openEdit = useCallback((inq: Inquiry) => { ui.setEditId(inq.id); ui.setEditData({ name: inq.name, phone: inq.phone, email: inq.email || "", interest: inq.interest, status: inq.status as InquiryFormValues["status"], source: inq.source || "Walk-in", notes: inq.notes || "" }); ui.setShowModal(true); }, [ui]);
  const saveInquiry = useCallback(async (data: ManagerInquiriesWritePayload) => { if (ui.editId) updateInquiry({ id: ui.editId, data }); else createInquiry(data); }, [createInquiry, ui.editId, updateInquiry]);
  const deleteInquiry = useCallback(async (id: string) => { const idempotencyKey = deleteKeyByIdRef.current.get(id) ?? createManagerIdempotencyKey(); deleteKeyByIdRef.current.set(id, idempotencyKey); await removeInquiry({ id, idempotencyKey }); deleteKeyByIdRef.current.delete(id); }, [removeInquiry]);
  const updateStatus = useCallback(async (id: string, status: string) => { updateInquiry({ id, data: { status: status as InquiryFormValues["status"] } }); }, [updateInquiry]);
  const openMsg = useCallback((inq: Inquiry, type: ManagerInquiriesMessageType) => { ui.setMsgModal({ open: true, type, recipient: { name: inq.name, phone: inq.phone, email: inq.email || "" }, message: generateDefaultMessage(inq.name, inq.interest) }); }, [ui]);
  const openBulkMsg = useCallback((type: ManagerInquiriesMessageType) => { const recipients = inquiries.filter((inq) => ui.selectedIds.includes(inq.id)).map((inq) => ({ name: inq.name, phone: inq.phone, email: inq.email || "" })); ui.setBulkMsgModal({ open: true, type, recipients }); }, [inquiries, ui]);
  const toggleSelectAll = useCallback((selectAll: boolean) => ui.setSelectedIds(selectAll ? inquiries.map((inq) => inq.id) : []), [inquiries, ui]);
  const toggleSelectOne = useCallback((id: string) => ui.setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]), [ui]);
  const openConvert = useCallback((inq: Inquiry) => ui.setConvertLead(inq), [ui]);
  return {
    inquiries, stats: statsQuery.data ?? null, isPending: listQuery.isPending || statsQuery.isPending, isError: listQuery.isError, errorMessage, totalInquiries: listQuery.data?.total ?? 0, toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast,
    search, debouncedSearch, setSearch: (value) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value) => setUrlParam("status", value), dateFilter, setDateFilter: (value) => setUrlParam("date", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)),
    selectedIds: ui.selectedIds, toggleSelectAll, toggleSelectOne, clearSelection: () => ui.setSelectedIds([]), showModal: ui.showModal, setShowModal: ui.setShowModal, editId: ui.editId, editData: ui.editData, saving: isCreating || isUpdating, openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal: ui.msgModal, openMsg, closeMsg: () => ui.setMsgModal(null), bulkMsgModal: ui.bulkMsgModal, openBulkMsg, closeBulkMsg: () => ui.setBulkMsgModal(null), convertLead: ui.convertLead, openConvert, closeConvert: () => ui.setConvertLead(null), convertLeadMutation, isConverting, refresh };
}
