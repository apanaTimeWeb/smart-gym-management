// DATA FLOW: UI/URL → hook → TanStack Query/Zustand → components
// RESPONSIBILITY: Custom hook encapsulating UI state and orchestrating actions for the members module.
'use client';
import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import { useManagerMembersMutations } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersMutations';
import { useManagerMembersPrintLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersPrintLogic';
import { useFetchMember } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersQueries';
import { useManagerMembersUrlState } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersUrlState';
import { useManagerMembersUiStore } from '@/app/manager/members/members_store/ManagerUseManagerMembersUiStore';
import { downloadManagerMembersCsv, printManagerMembersPdf } from '@/app/manager/members/members_utils/ManagerMembersExportUtils';
import { EMPTY_MEMBER_FORM, MSG_TEMPLATES } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { ManagerMembersMessageType, ManagerMembersMessageRecipient } from '@/app/manager/members/members_types/ManagerMembersMessageTypes';
import type { Member, ManagerMembersViewModel, MembersInitialData, ExportFormat } from '@/app/manager/members/members_types/ManagerMembersTypes';

/** Manages UseMembersLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMembersLogic(initialData?: MembersInitialData | null): ManagerMembersViewModel {
  const urlState = useManagerMembersUrlState();

  const ui = useManagerMembersUiStore();
  const queryClient = useQueryClient();
  const { data: selectedMember = null } = useFetchMember(ui.selectedMemberId);
  const setSelectedMember = useCallback((member: Member | null) => {
    if (member) {
      queryClient.setQueryData(['manager', 'members', 'detail', member.id], member);
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
    const response = await membersApi.exportMembersReport({
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
    const tpl = m.status === 'EXPIRED'
      ? MSG_TEMPLATES.EXPIRED(m.name)
      : m.pendingAmount > 0
      ? MSG_TEMPLATES.PENDING(m.name, formatCurrencyFromMinorUnits(m.pendingAmount, ManagerEnvConfig.currencyCode))
      : MSG_TEMPLATES.DEFAULT(m.name);
    ui.setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
  }, [ui]);

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
