// RESPONSIBILITY: Custom hook encapsulating UI state and orchestrating actions for the members module. Async state is in useMembersStore.
// DATA FLOW: UI Interactions -> useMembersLogic -> useMembersStore -> API
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Member, MembersContextType, MembersInitialData } from '@/app/erp/members/members_types/members_types';
import type { Payment } from '@/app/erp/finance/finance_types/finance_types';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';
import { EMPTY_MEMBER_FORM, formatCurrency, MSG_TEMPLATES, MemberFormValues } from '@/app/erp/members/members_utils/MembersSharedConstants';
import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { useMembersStore } from '@/app/erp/members/members_store/useMembersStore';

export function useMembersLogic(initialData?: MembersInitialData | null): MembersContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Zustand Store
  const hydrate = useMembersStore((s) => s.hydrate);
  const loadAll = useMembersStore((s) => s.loadAll);
  const storeSaveMember = useMembersStore((s) => s.saveMember);
  const storeDeleteMember = useMembersStore((s) => s.deleteMember);

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
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<MemberFormValues | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'attendance' | 'payments'>('overview');
  const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [printData, setPrintData] = useState<ErpReceiptData | null>(null);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);
  const closeMsg = useCallback(() => setMsgModal(null), []);

  // Refetch when URL params change after initial SSR hydration.
  // showToast is defined above so the closure captures the correct reference.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    loadAll({ search: debouncedSearch, status: statusFilter, page: currentPage.toString() }).catch(() => {
      showToast('Failed to load members', 'error');
    });
  }, [loadAll, debouncedSearch, statusFilter, currentPage, showToast]);

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
      await loadAll({ search: debouncedSearch, status: statusFilter, page: currentPage.toString() });
    } catch (err: unknown) { 
      showToast(err instanceof Error ? err.message : 'Save failed', 'error'); 
    }
  }, [editId, loadAll, showToast, storeSaveMember, debouncedSearch, statusFilter, currentPage]);

  const deleteMember = useCallback(async (id: number) => {
    const isConfirmed = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member? This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await storeDeleteMember(id);
      showToast(res.message, 'success');
      if (selectedMember?.id === id) setSelectedMember(null);
      await loadAll({ search: debouncedSearch, status: statusFilter, page: currentPage.toString() });
    } catch (err: unknown) { 
      showToast(err instanceof Error ? err.message : 'Delete failed', 'error'); 
    }
  }, [loadAll, showToast, selectedMember, confirm, storeDeleteMember, debouncedSearch, statusFilter, currentPage]);

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

  return {
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    toast, showToast, hideToast,
    selectedMember, setSelectedMember, profileTab, setProfileTab,
    showAddModal, setShowAddModal, editId, editData,
    openAdd, openEdit, saveMember, deleteMember,
    msgModal, openMsg, closeMsg,
    printData, handlePrint, setPrintData
  };
}
