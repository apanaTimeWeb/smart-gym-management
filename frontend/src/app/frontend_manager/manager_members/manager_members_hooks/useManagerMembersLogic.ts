'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { ManagerMembersApi } from '@/app/frontend_manager/manager_members/manager_members_api/ManagerMembersApi';
import { MANAGER_MEMBERS_STATUS_EXPIRED } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { ManagerMembersQueryKeys } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersQueryKeys';
import { EMPTY_MEMBER_FORM, MSG_TEMPLATES } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { useManagerMembersMutations } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersMutations';
import { useManagerMembersPrintLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersPrintLogic';
import { useFetchMember } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';
import { useManagerMembersUrlState } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersUrlState';
import { useManagerMembersUiStore } from '@/app/frontend_manager/manager_members/manager_members_store/useManagerMembersUiStore';
import { downloadManagerMembersCsv, printManagerMembersPdf } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersExportUtils';
import { ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { ManagerMembersMessageType } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersMessageTypes';
import type { Member, ManagerMembersViewModel, MembersInitialData, ExportFormat } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/** Manages UseMembersLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersLogic.
 * @dependencies Uses ManagerMembersFormatters, ManagerEnvConfig, ManagerMembersApi, useManagerMembersMutations.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/**
 * @description Owns Manager Members list state, filter state, and member workflow coordination for the members feature.
 * @dependencies Delegates server state to TanStack Query hooks and mutations to feature-owned hooks.
 * @edge-case Preserves resource identity, pagination resets, confirmation flows, and retry-safe UI state.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersLogic owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersLogic(initialData?: MembersInitialData | null): ManagerMembersViewModel {
  const urlState = useManagerMembersUrlState();
  const locale = useLocale();

  const ui = useManagerMembersUiStore();
  const queryClient = useQueryClient();
  const { data: selectedMember = null } = useFetchMember(ui.selectedMemberId);
  const setSelectedMember = useCallback((member: Member | null) => {
    if (member) {
      queryClient.setQueryData(ManagerMembersQueryKeys.detail(member.id), member);
    }
    ui.setSelectedMemberId(member?.id ?? null);
  }, [queryClient, ui.setSelectedMemberId]);
  const showToast = ui.showToast;
  const hideToast = ui.hideToast;
  const closeMsg = ui.closeMsg;

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (urlState.searchParams.get('action') !== 'add_member') return;

    const name = urlState.searchParams.get('name') || '';
    const phone = urlState.searchParams.get('phone') || '';
    const email = urlState.searchParams.get('email') || '';
    ui.setEditId(null);
    ui.setEditData({ ...EMPTY_MEMBER_FORM, name, phone, email });
    ui.setShowAddModal(true);
    urlState.setUrlParam('action', null);
    urlState.setUrlParam('name', null);
    urlState.setUrlParam('phone', null);
    urlState.setUrlParam('email', null);
  }, [ui, urlState.searchParams, urlState.setUrlParam]);

  const openAdd = ui.openAdd;
  const openEdit = ui.openEdit;

  const { saveMember, deleteMember, assignDiet, assignWorkout, renewMember, recordPayment, freezeMember, toggleSuspend, assignTrainer } = useManagerMembersMutations(
    showToast, selectedMember, setSelectedMember, ui.editId, ui.setShowAddModal, ui.setShowRenewModal, ui.setShowPaymentModal
  );

  const exportMembers = useCallback(async (format: ExportFormat) => {
    const response = await ManagerMembersApi.exportMembersReport({
      search: urlState.debouncedSearch,
      status: urlState.statusFilter,
      gender: urlState.genderFilter,
      plan: urlState.planFilter,
      expiryFrom: urlState.expiryFrom,
      expiryTo: urlState.expiryTo,
      sort: urlState.sortColumn,
      dir: urlState.sortDirection });
    const allMembers = response.data?.members ?? [];
    if (format === 'csv') downloadManagerMembersCsv(allMembers);
    else printManagerMembersPdf(allMembers);
  }, [urlState.debouncedSearch, urlState.statusFilter, urlState.genderFilter, urlState.planFilter, urlState.expiryFrom, urlState.expiryTo, urlState.sortColumn, urlState.sortDirection]);

  const { printData, setPrintData, handlePrint, handleSharePaymentWhatsApp } = useManagerMembersPrintLogic(
    selectedMember, showToast
  );

  const openMsg = useCallback((m: Member, type: ManagerMembersMessageType) => {
    const tpl = (() => { if (m.status === MANAGER_MEMBERS_STATUS_EXPIRED) return MSG_TEMPLATES.EXPIRED(m.name); return (() => { if (m.pendingAmount > 0) return MSG_TEMPLATES.PENDING(m.name, ManagerMembersFormatCurrency(m.pendingAmount, ManagerEnvConfig.currencyCode, locale)); return MSG_TEMPLATES.DEFAULT(m.name); })(); })();
    ui.setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
  }, [locale, ui]);

  return {
    ...urlState,
    toast: ui.toast, showToast, hideToast,
    selectedMember, setSelectedMember, profileTab: ui.profileTab, setProfileTab: ui.setProfileTab,
    showAddModal: ui.showAddModal, setShowAddModal: ui.setShowAddModal, editId: ui.editId, editData: ui.editData,
    showRenewModal: ui.showRenewModal, setShowRenewModal: ui.setShowRenewModal,
    showPaymentModal: ui.showPaymentModal, setShowPaymentModal: ui.setShowPaymentModal,
    openAdd, openEdit, saveMember, deleteMember, assignDiet, assignWorkout, renewMember, recordPayment, freezeMember, toggleSuspend, assignTrainer,
    msgModal: ui.msgModal, openMsg, closeMsg,
    printData: ui.printData, handlePrint, handleSharePaymentWhatsApp, setPrintData: ui.setPrintData, exportMembers
  };
}
