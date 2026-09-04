// RESPONSIBILITY: Custom hook encapsulating UI state and orchestrating actions for the members module. Async state is in useManagerMembersStore.
// DATA FLOW: UI Interactions -> useManagerMembersLogic -> useManagerMembersStore -> API
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Member, MembersContextType, MembersInitialData } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { Payment } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { MessageType, ManagerMessageRecipient } from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';
import type { ManagerReceiptData } from '@/app/manager/manager_components/ManagerShared/ManagerThermalReceipt';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { EMPTY_MEMBER_FORM, formatCurrency, MSG_TEMPLATES, MemberFormValues } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { GYM_DETAILS } from '@/app/manager/manager_utils/ManagerSharedConstants';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { useManagerMembersStore } from '@/app/manager/members/members_store/useManagerMembersStore';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';

export function useManagerMembersLogic(initialData?: MembersInitialData | null): MembersContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Zustand Store
  const hydrate = useManagerMembersStore((s) => s.hydrate);
  const loadAll = useManagerMembersStore((s) => s.loadAll);
  const storeSaveMember = useManagerMembersStore((s) => s.saveMember);
  const storeDeleteMember = useManagerMembersStore((s) => s.deleteMember);
  const storeAssignDiet = useManagerMembersStore((s) => s.assignDiet);
  const storeAssignWorkout = useManagerMembersStore((s) => s.assignWorkout);
  const storeRenewMember = useManagerMembersStore((s) => s.renewMember);
  const storeRecordPayment = useManagerMembersStore((s) => s.recordPayment);

  const isFirstRender = React.useRef(true);

  // Hydrate Zustand with SSR data exactly once on mount.
  // useEffect: SSR hydration runs once on mount only.
  useEffect(() => {
    if (initialData) {
      hydrate(initialData);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- intentionally empty: SSR hydration runs once on mount only

  // URL State
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

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
  const [printData, setPrintData] = useState<ManagerReceiptData | null>(null);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);
  const closeMsg = useCallback(() => setMsgModal(null), []);

  // Refetch when URL params change after initial SSR hydration.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialData) return;
    }
    loadAll({ search: debouncedSearch, status: statusFilter, page: currentPage.toString() }).catch(() => {
      showToast('Failed to load members', 'error');
    });
  }, [loadAll, debouncedSearch, statusFilter, currentPage, showToast, initialData]);

  // Handle auto-open add member modal (e.g. from Lead Conversion)
  useEffect(() => {
    if (searchParams.get('action') === 'add_member') {
      const name = searchParams.get('name') || '';
      const phone = searchParams.get('phone') || '';
      const email = searchParams.get('email') || '';
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditId(null);
      setEditData({
        ...EMPTY_MEMBER_FORM,
        name, phone, email
      });
      setShowAddModal(true);
      
      // Clean up URL so it doesn't reopen on refresh
      setUrlParam('action', null);
      setUrlParam('name', null);
      setUrlParam('phone', null);
      setUrlParam('email', null);
    }
  }, [searchParams, setUrlParam]);

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
      gender: (m.gender || 'MALE') as "MALE"|"FEMALE"|"OTHER", 
      billingCycle: m.billingCycle, 
      customDays: 0,
      planId: String(m.planId) 
    } as MemberFormValues);
    setShowAddModal(true);
  }, []);

  const saveMember = useCallback(async (data: MemberFormValues) => {
    try {
      const res = await storeSaveMember(data, editId);
      showToast(res.message, 'success');
      setShowAddModal(false);
    } catch (err: unknown) { 
      showToast(err instanceof Error ? err.message : 'Save failed', 'error'); 
    }
  }, [editId, showToast, storeSaveMember]);

  const deleteMember = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member? This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await storeDeleteMember(id);
      showToast(res.message, 'success');
      if (selectedMember?.id === id) setSelectedMember(null);
    } catch (err: unknown) { 
      showToast(err instanceof Error ? err.message : 'Delete failed', 'error'); 
    }
  }, [showToast, selectedMember, confirm, storeDeleteMember]);

  const assignDiet = useCallback(async (memberId: string, diet: any) => {
    try {
      await storeAssignDiet(memberId, diet);
      showToast('Diet plan assigned successfully', 'success');
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, assignedDietId: diet?.id || '', assignedDiet: diet || undefined } : null);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to assign diet', 'error');
    }
  }, [storeAssignDiet, showToast, selectedMember]);

  const assignWorkout = useCallback(async (memberId: string, workout: any) => {
    try {
      await storeAssignWorkout(memberId, workout);
      showToast('Workout plan assigned successfully', 'success');
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined } : null);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to assign workout', 'error');
    }
  }, [storeAssignWorkout, showToast, selectedMember]);

  const renewMember = useCallback(async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number }) => {
    if (!selectedMember) return;
    try {
      const res = await storeRenewMember(selectedMember.id, data);
      showToast(res.message, 'success');
      setShowRenewModal(false);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Renewal failed', 'error');
    }
  }, [selectedMember, showToast, storeRenewMember]);

  const recordPayment = useCallback(async (data: { amount: number; method: string }) => {
    if (!selectedMember) return;
    try {
      const res = await storeRecordPayment(selectedMember.id, data);
      showToast(res.message, 'success');
      setShowPaymentModal(false);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Payment recording failed', 'error');
    }
  }, [selectedMember, showToast, storeRecordPayment]);

  const openMsg = useCallback((m: Member, type: MessageType) => {
    const tpl = m.status === 'EXPIRED'
      ? MSG_TEMPLATES.EXPIRED(m.name)
      : m.pendingAmount > 0
      ? MSG_TEMPLATES.PENDING(m.name, formatCurrency(m.pendingAmount))
      : MSG_TEMPLATES.DEFAULT(m.name);
    setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
  }, []);

  const handlePrint = useCallback((p: Payment) => {
    if (!selectedMember) return;
    const m = selectedMember;
    setPrintData({
      gymName: GYM_DETAILS.name, gymPhone: GYM_DETAILS.phone,
      receiptNo: p.invoiceNo,
      date: new Date(p.paidAt).toLocaleDateString('en-IN'),
      customerName: m.name,
      items: [{ name: `Membership - ${m.plan?.name || ''}`, price: p.amount, amount: p.amount }],
      total: p.amount, paymentMethod: p.method,
    });
    if (typeof window !== 'undefined') setTimeout(() => window.print(), 100);
  }, [selectedMember]);

  const handleSharePaymentWhatsApp = useCallback((p: Payment) => {
    if (!selectedMember) return;
    const m = selectedMember;
    
    const waText = WhatsAppFormatter.formatReceipt({
      title: GYM_DETAILS.name,
      subtitle: 'Payment Receipt',
      date: new Date(p.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      customerInfo: {
        'Member': m.name,
        'Invoice': p.invoiceNo,
      },
      sections: [
        {
          items: {
            'Membership': m.plan?.name || 'Standard',
            'Amount': formatCurrency(p.amount),
            'Method': p.method
          }
        },
        {
          items: {
            'Status': p.status
          }
        }
      ],
      footer: 'Thank you for your payment!'
    });

    window.open(`https://wa.me/91${m.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(waText)}`, '_blank');
    showToast('Receipt opened in WhatsApp', 'success');
  }, [selectedMember, showToast]);

  return {
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    toast, showToast, hideToast,
    selectedMember, setSelectedMember, profileTab, setProfileTab,
    showAddModal, setShowAddModal, editId, editData,
    showRenewModal, setShowRenewModal,
    showPaymentModal, setShowPaymentModal,
    openAdd, openEdit, saveMember, deleteMember, assignDiet, assignWorkout, renewMember, recordPayment,
    msgModal, openMsg, closeMsg,
    printData, handlePrint, handleSharePaymentWhatsApp, setPrintData
  };
}
