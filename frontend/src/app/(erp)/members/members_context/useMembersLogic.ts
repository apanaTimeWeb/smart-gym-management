import { useState, useCallback, useEffect } from 'react';
import { membersApi, plansApi, financeApi, type Member, type Plan, type Payment } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/(erp)/erp_components/ErpMessageModal';
import type { ErpReceiptData } from '@/app/(erp)/erp_components/ErpThermalReceipt';
import { EMPTY_MEMBER_FORM, formatCurrency } from '../members_utils/MembersSharedConstants';
import { MembersContextType } from '../members_types/members_types';

export function useMembersLogic(): MembersContextType {
 const [members, setMembers] = useState<Member[]>([]);
 const [plans, setPlans] = useState<Plan[]>([]);
 const [payments, setPayments] = useState<Payment[]>([]);
 const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, expired: 0 });
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);

 const [search, setSearch] = useState('');
 const [statusFilter, setStatusFilter] = useState('All');

 const [showAddModal, setShowAddModal] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [selectedMember, setSelectedMember] = useState<Member | null>(null);
 const [profileTab, setProfileTab] = useState<'overview' | 'attendance' | 'payments'>('overview');

 const [form, setForm] = useState(EMPTY_MEMBER_FORM);

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
 const [membersRes, plansRes, statsRes] = await Promise.all([
 membersApi.getAll({ limit: '500' }),
 plansApi.getAll(),
 membersApi.getStats(),
 ]);
 setMembers(membersRes.data.members);
 setPlans(plansRes.data);
 setStats(statsRes.data);
 } catch (e) {
 showToast((e as Error).message, 'error');
 } finally {
 setLoading(false);
 }
 }, [showToast]);

 useEffect(() => { loadAll(); }, [loadAll]);

 const loadMemberProfile = async (memberId: number) => {
 try {
 const pRes = await financeApi.getByMember(memberId);
 setPayments(pRes.data);
 
 const tokenRes = await fetch('/api/auth/token');
 const { token } = tokenRes.ok ? await tokenRes.json() : { token: null };
 const aRes = await fetch(`http://localhost:5000/api/attendance?memberId=${memberId}`, {
 headers: token ? { Authorization: `Bearer ${token}` } : {},
 }).then(r => r.json());
 
 if (aRes.success) {
 const daysInMonth = 30;
 const realAtt = Array.from({ length: daysInMonth }, (_, i) => {
 const d = i + 1;
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const rec = aRes.data.find((a: any) => new Date(a.date).getDate() === d);
 return { day: d, status: rec ? 'P' : 'A' };
 });
 setAttMap(prev => ({ ...prev, [memberId]: realAtt }));
 }
 } catch { 
 setPayments([]); 
 setAttMap(prev => ({ ...prev, [memberId]: [] }));
 }
 };

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
 setForm(EMPTY_MEMBER_FORM); 
 setShowAddModal(true); 
 }, []);
 
 const openEdit = useCallback((m: Member) => {
 setEditId(m.id);
 setForm({ 
 name: m.name, 
 email: m.email, 
 phone: m.phone, 
 address: m.address || '', 
 gender: m.gender, 
 branch: m.branch, 
 billingCycle: m.billingCycle, 
 planId: m.planId 
 });
 setShowAddModal(true);
 }, []);

 const saveMember = useCallback(async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 try {
 if (editId) {
 await membersApi.update(editId, { ...form, planId: Number(form.planId) });
 showToast('Member updated!', 'success');
 } else {
 await membersApi.create({ ...form, planId: Number(form.planId), joinDate: new Date().toISOString() });
 showToast('Member added!', 'success');
 }
 setShowAddModal(false);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editId, form, loadAll, showToast]);

 const deleteMember = useCallback(async (id: number) => {
 if (!window.confirm('Delete this member?')) return;
 try {
 await membersApi.remove(id);
 showToast('Member deleted', 'success');
 if (selectedMember?.id === id) setSelectedMember(null);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast, selectedMember]);

 const openMsg = useCallback((m: Member, type: MessageType) => {
 const tpl = m.status === 'EXPIRED'
 ? `Hi ${m.name}! 🔔\n\nYour membership has expired. Renew today to continue your fitness journey!\n\n— Team GymSmart`
 : m.pendingAmount > 0
 ? `Hi ${m.name} 🙏\n\nFriendly reminder: You have a pending amount of ${formatCurrency(m.pendingAmount)}. Please clear your dues at the earliest.\n\n— Team GymSmart`
 : `Hi ${m.name}! 👋\n\nThis is a message from GymSmart. We hope you're enjoying your fitness journey!\n\n— Team GymSmart`;
 setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
 }, []);

 const handlePrint = useCallback((p: Payment) => {
 if (!selectedMember) return;
 const m = selectedMember;
 setPrintData({
 gymName: 'GymSmart Fitness', gymPhone: '+91 83479 77566',
 receiptNo: p.invoiceNo,
 date: new Date(p.paidAt).toLocaleDateString('en-IN'),
 customerName: m.name,
 items: [{ name: `Membership - ${m.plan?.name || ''}`, price: p.amount, amount: p.amount }],
 total: p.amount, paymentMethod: p.method,
 });
 setTimeout(() => window.print(), 100);
 }, [selectedMember]);

 return {
 members, plans, payments, stats, loading, saving,
 search, setSearch, statusFilter, setStatusFilter,
 toast, showToast, hideToast, loadAll,
 selectedMember, setSelectedMember, profileTab, setProfileTab, loadMemberProfile,
 attMap, getAtt, toggleAtt,
 showAddModal, setShowAddModal, editId, form, setForm,
 openAdd, openEdit, saveMember, deleteMember,
 msgModal, openMsg, closeMsg,
 printData, handlePrint, setPrintData
 };
}
