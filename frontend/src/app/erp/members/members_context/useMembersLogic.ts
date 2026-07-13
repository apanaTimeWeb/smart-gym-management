// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the members module.
// DATA FLOW: membersApi -> useMembersLogic -> MembersContext
import React, { useState, useCallback, useEffect } from 'react';
import { ApiResponse } from '@/lib/api';
import { plansApi } from '@/app/erp/plans/plans_api/plans_api';
import { financeApi } from '@/app/erp/finance/finance_api/finance_api';
import { attendanceApi } from '@/app/erp/attendance/attendance_api/attendance_api';
import type { Member } from '@/app/erp/members/members_types/members_types';
import type { Plan } from '@/app/erp/plans/plans_types/plans_types';
import type { Payment } from '@/app/erp/finance/finance_types/finance_types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { membersApi } from '@/app/erp/members/members_api/members_api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';
import { EMPTY_MEMBER_FORM, formatCurrency, MSG_TEMPLATES, MemberFormValues } from '@/app/erp/members/members_utils/MembersSharedConstants';
import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';
import { MembersContextType, FetchState, MembersInitialData } from '@/app/erp/members/members_types/members_types';

import { useDebounce } from '@/app/erp/erp_utils/useDebounce';

/**
 * Hook to manage members data, state, and API fetching.
 */
export function useMembersLogic(initialData?: MembersInitialData | null): MembersContextType {
  const { confirm } = useConfirm();
  const [members, setMembers] = useState<Member[]>(initialData?.members || []);
  const [plans, setPlans] = useState<Plan[]>(initialData?.plans || []);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState(initialData?.stats || { total: 0, active: 0, pending: 0, expired: 0 });
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? FetchState.SUCCESS : FetchState.LOADING);
  const [saving, setSaving] = useState(false);
  const isFirstRender = React.useRef(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read state from URL
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useDebounce(search, 300);
  
  const [totalMembers, setTotalMembers] = useState(initialData?.totalMembers || 0);

  // Sync state back to URL
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1'); // Reset page when filters change
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

 const [showAddModal, setShowAddModal] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [editData, setEditData] = useState<MemberFormValues | null>(null);
 const [selectedMember, setSelectedMember] = useState<Member | null>(null);
 const [profileTab, setProfileTab] = useState<'overview' | 'attendance' | 'payments'>('overview');

 const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
 const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 const [printData, setPrintData] = useState<ErpReceiptData | null>(null);

 const [attMap, setAttMap] = useState<Record<number, { day: number; status: string }[]>>({});

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);
 const closeMsg = useCallback(() => setMsgModal(null), []);

  const loadAll = useCallback(async () => {
    setFetchState(FetchState.LOADING);
    try {
      const params: Record<string, string> = { 
        limit: '10', 
        page: currentPage.toString() 
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'All') params.status = statusFilter;

      const [membersRes, plansRes, statsRes] = await Promise.all([
        membersApi.getAll(params),
        plansApi.getAll(),
        membersApi.getStats(),
      ]);
      setMembers(membersRes.data.members || []);
      setTotalMembers(membersRes.data.total || 0);
      setPlans(plansRes.data);
      setStats(statsRes.data);
      setFetchState(FetchState.SUCCESS);
    } catch (e) {
      setFetchState(FetchState.ERROR);
      showToast((e as Error).message, 'error');
    }
  }, [showToast, currentPage, debouncedSearch, statusFilter]);

  useEffect(() => { 
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    loadAll(); 
  }, [loadAll, initialData]);

  const loadMemberProfile = useCallback(async (memberId: number) => {
    try {
      const pRes = await financeApi.getByMember(memberId);
      setPayments(pRes.data);
      
      const aRes = await attendanceApi.getAll({ memberId: memberId.toString() });
      
      if (aRes.success) {
        const daysInMonth = 30;
        const realAtt = Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const rec = aRes.data.attendance?.find((a: any) => new Date(a.date).getDate() === d);
          return { day: d, status: rec ? 'P' : 'A' };
        });
        setAttMap(prev => ({ ...prev, [memberId]: realAtt }));
      }
    } catch { 
      setPayments([]); 
      setAttMap(prev => ({ ...prev, [memberId]: [] }));
    }
  }, []);

 const getAtt = useCallback((id: number) => attMap[id] || [], [attMap]);
 
 const toggleAtt = useCallback((memberId: number, day: number) => {
 setAttMap(prev => {
 const currentAtt = prev[memberId] || [];
 const updatedAtt = currentAtt.map(a => a.day === day ? { ...a, status: a.status === 'P' ? 'A' : a.status === 'A' ? 'L' : 'P' } : a);
 return { ...prev, [memberId]: updatedAtt };
 });
 }, []);

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
  setSaving(true);
  try {
    if (editId) {
    const res = await membersApi.update(Number(editId), { ...data, planId: Number(data.planId) });
    showToast(res.message || 'Updated successfully', 'success');
    } else {
    const res = await membersApi.create({ ...data, planId: Number(data.planId), joinDate: new Date().toISOString() });
   showToast(res.message || 'Created successfully', 'success');
   }
  setShowAddModal(false);
  await loadAll();
  } catch (err) { 
  showToast((err as Error).message, 'error'); 
  } finally { 
  setSaving(false); 
  }
  }, [editId, loadAll, showToast]);

  const deleteMember = useCallback(async (id: number) => {
   const isConfirmed = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member? This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
   if (!isConfirmed) return;
   try {
  const res = await membersApi.remove(id);
  showToast(res.message || 'Deleted successfully', 'success');
  if (selectedMember?.id === id) setSelectedMember(null);
  await loadAll();
  } catch (err) { 
  showToast((err as Error).message, 'error'); 
  }
  }, [loadAll, showToast, selectedMember, confirm]);

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
 setTimeout(() => window.print(), 100);
 }, [selectedMember]);

  return {
    members, plans, payments, stats, fetchState, saving, totalMembers,
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage,
 toast, showToast, hideToast, loadAll,
 selectedMember, setSelectedMember, profileTab, setProfileTab, loadMemberProfile,
 attMap, getAtt, toggleAtt,
 showAddModal, setShowAddModal, editId, editData,
 openAdd, openEdit, saveMember, deleteMember,
 msgModal, openMsg, closeMsg,
 printData, handlePrint, setPrintData
 };
}
