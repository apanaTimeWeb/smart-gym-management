import React, { useState, useCallback, useEffect } from 'react';
import { membersApi, plansApi, financeApi, attendanceApi, type Member, type Plan, type Payment } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import type { ErpReceiptData } from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';
import { EMPTY_MEMBER_FORM, formatCurrency, MSG_TEMPLATES, MemberFormValues } from '@/app/erp/members/members_utils/MembersSharedConstants';
import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';
import { MembersContextType } from '@/app/erp/members/members_types/members_types';

import { useDebounce } from '@/app/erp/erp_utils/useDebounce';

export function useMembersLogic(initialData?: any): MembersContextType {
  const { confirm } = useConfirm();
  const [members, setMembers] = useState<Member[]>(initialData?.members || []);
  const [plans, setPlans] = useState<Plan[]>(initialData?.plans || []);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState(initialData?.stats || { total: 0, active: 0, pending: 0, expired: 0 });
  const [loading, setLoading] = useState(!initialData);
  const [saving, setSaving] = useState(false);
  const isFirstRender = React.useRef(true);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMembers, setTotalMembers] = useState(initialData?.totalMembers || 0);

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
    setLoading(true);
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
    } catch (e) {
      showToast((e as Error).message, 'error');
    } finally {
      setLoading(false);
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
 gender: (m.gender as "MALE"|"FEMALE"|"OTHER") || 'MALE', 
 branch: m.branch, 
 billingCycle: m.billingCycle, 
 planId: m.planId 
 } as unknown as MemberFormValues);
 setShowAddModal(true);
 }, []);

 const saveMember = useCallback(async (data: MemberFormValues) => {
 setSaving(true);
 try {
 if (editId) {
 const res = await membersApi.update(editId, { ...data, planId: Number(data.planId) });
 showToast((res as any).message, 'success');
 } else {
 const res = await membersApi.create({ ...data, planId: Number(data.planId), joinDate: new Date().toISOString() });
 showToast((res as any).message, 'success');
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
 showToast((res as any).message, 'success');
 if (selectedMember?.id === id) setSelectedMember(null);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast, selectedMember]);

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
    members, plans, payments, stats, loading, saving, totalMembers,
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
