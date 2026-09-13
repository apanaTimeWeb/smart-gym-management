// RESPONSIBILITY: Custom hook encapsulating UI state and orchestrating actions for the members module.
// DATA FLOW: UI Interactions -> useManagerMembersLogic -> Context -> Components
import React, { useState, useCallback, useEffect } from 'react';
import type { Member, MembersContextType, MembersInitialData } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { MessageType, ManagerMessageRecipient } from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';
import { EMPTY_MEMBER_FORM, formatCurrency, MSG_TEMPLATES } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { MemberFormValues } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { useManagerMembersMutations } from '@/app/manager/members/members_context/useManagerMembersMutations';
import { useManagerMembersPrintLogic } from '@/app/manager/members/members_context/useManagerMembersPrintLogic';
import { useManagerMembersUrlState } from '@/app/manager/members/members_context/useManagerMembersUrlState';

export function useManagerMembersLogic(initialData?: MembersInitialData | null): MembersContextType {
  const urlState = useManagerMembersUrlState();

  // UI State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<MemberFormValues | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'attendance' | 'payments' | 'workout' | 'diet'>('overview');
  const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ManagerMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);
  const closeMsg = useCallback(() => setMsgModal(null), []);

  useEffect(() => {
    if (urlState.searchParams.get('action') === 'add_member') {
      const name = urlState.searchParams.get('name') || '';
      const phone = urlState.searchParams.get('phone') || '';
      const email = urlState.searchParams.get('email') || '';
      setTimeout(() => {
        setEditId(null);
        setEditData({ ...EMPTY_MEMBER_FORM, name, phone, email });
        setShowAddModal(true);
        urlState.setUrlParam('action', null);
        urlState.setUrlParam('name', null);
        urlState.setUrlParam('phone', null);
        urlState.setUrlParam('email', null);
      }, 0);
    }
  }, [urlState]);

  const openAdd = useCallback(() => { 
    setEditId(null); 
    setEditData(EMPTY_MEMBER_FORM); 
    setShowAddModal(true); 
  }, []);
  
  const openEdit = useCallback((m: Member) => {
    setEditId(m.id);
    setEditData({ 
      name: m.name, 
      email: m.email || '', 
      phone: m.phone, 
      address: m.address || '', 
      aadhaar: m.aadhaar || '',
      medicalHistory: m.medicalHistory || '',
      gender: (m.gender || 'MALE') as "MALE"|"FEMALE"|"OTHER", 
      billingCycle: m.billingCycle, 
      customDays: 0,
      planId: String(m.planId),
      joinDate: m.joinDate ? m.joinDate.split('T')[0] : '',
      expiryDate: m.expiryDate ? m.expiryDate.split('T')[0] : '',
      paidAmount: m.paidAmount || 0,
      totalAmount: (m.paidAmount || 0) + (m.pendingAmount || 0)
    } as MemberFormValues);
    setShowAddModal(true);
  }, []);

  const { saveMember, deleteMember, assignDiet, assignWorkout, renewMember, recordPayment, freezeMember, toggleSuspend, assignTrainer } = useManagerMembersMutations(
    showToast, selectedMember, setSelectedMember, editId, setShowAddModal, setShowRenewModal, setShowPaymentModal
  );

  const { printData, setPrintData, handlePrint, handleSharePaymentWhatsApp } = useManagerMembersPrintLogic(
    selectedMember, showToast
  );

  const openMsg = useCallback((m: Member, type: MessageType) => {
    const tpl = m.status === 'EXPIRED'
      ? MSG_TEMPLATES.EXPIRED(m.name)
      : m.pendingAmount > 0
      ? MSG_TEMPLATES.PENDING(m.name, formatCurrency(m.pendingAmount))
      : MSG_TEMPLATES.DEFAULT(m.name);
    setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
  }, []);

  const exportMembers = useCallback((format: string) => {
    showToast(`Exporting members as ${format}...`, 'success');
  }, [showToast]);

  return {
    ...urlState, exportMembers,
    toast, showToast, hideToast,
    selectedMember, setSelectedMember, profileTab, setProfileTab,
    showAddModal, setShowAddModal, editId, editData,
    showRenewModal, setShowRenewModal,
    showPaymentModal, setShowPaymentModal,
    openAdd, openEdit, saveMember, deleteMember, assignDiet, assignWorkout, renewMember, recordPayment, freezeMember, toggleSuspend, assignTrainer,
    msgModal, openMsg, closeMsg,
    printData, handlePrint, handleSharePaymentWhatsApp, setPrintData
  };
}
