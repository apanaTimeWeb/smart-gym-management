import { useState, useCallback, useEffect } from 'react';
import { inquiriesApi, type Inquiry, type InquiryStats } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/(erp)/erp_components/ErpMessageModal';
import { EMPTY_INQUIRY_FORM, generateDefaultMessage } from '../inquiries_utils/InquiriesSharedConstants';
import { InquiriesContextType } from '../inquiries_types/inquiries_types';

export function useInquiriesLogic(): InquiriesContextType {
 const [inquiries, setInquiries] = useState<Inquiry[]>([]);
 const [stats, setStats] = useState<InquiryStats | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 
 const [search, setSearch] = useState('');
 const [statusFilter, setStatusFilter] = useState('All');
 const [dateFilter, setDateFilter] = useState('all');
 
 const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const [showModal, setShowModal] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [form, setForm] = useState(EMPTY_INQUIRY_FORM);
 const [saving, setSaving] = useState(false);
 
 const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
 const closeMsg = useCallback(() => setMsgModal(null), []);

 const loadAll = useCallback(async () => {
 setLoading(true);
 setError('');
 try {
 const [inqRes, statsRes] = await Promise.all([
 inquiriesApi.getAll({ limit: '200' }),
 inquiriesApi.getStats(),
 ]);
 setInquiries(inqRes.data.inquiries);
 setStats(statsRes.data);
 } catch (e) {
 const msg = (e as Error).message;
 setError(msg);
 showToast(msg, 'error');
 } finally {
 setLoading(false);
 }
 }, [showToast]);

 useEffect(() => { loadAll(); }, [loadAll]);

 const openAdd = useCallback(() => {
 setEditId(null);
 setForm(EMPTY_INQUIRY_FORM);
 setShowModal(true);
 }, []);

 const openEdit = useCallback((inq: Inquiry) => {
 setEditId(inq.id);
 setForm({ 
 name: inq.name, 
 phone: inq.phone, 
 email: inq.email || '', 
 interest: inq.interest, 
 status: inq.status, 
 source: inq.source || 'Walk-in', 
 notes: inq.notes || '' 
 });
 setShowModal(true);
 }, []);

 const saveInquiry = useCallback(async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 try {
 if (editId) { 
 await inquiriesApi.update(editId, form); 
 showToast('Inquiry updated!', 'success'); 
 } else { 
 await inquiriesApi.create(form); 
 showToast('Inquiry added!', 'success'); 
 }
 setShowModal(false);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [form, editId, loadAll, showToast]);

 const deleteInquiry = useCallback(async (id: number) => {
 if (!window.confirm('Delete this inquiry?')) return;
 try { 
 await inquiriesApi.remove(id); 
 showToast('Deleted', 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);
 
 const updateStatus = useCallback(async (id: number, status: string) => {
 try {
 await inquiriesApi.update(id, { status });
 await loadAll();
 } catch (err) {
 showToast((err as Error).message, 'error');
 }
 }, [loadAll, showToast]);

 const openMsg = useCallback((inq: Inquiry, type: MessageType) => {
 const msg = generateDefaultMessage(inq.name, inq.interest);
 setMsgModal({ 
 open: true, 
 type, 
 recipient: { name: inq.name, phone: inq.phone, email: inq.email || '' }, 
 message: msg 
 });
 }, []);

 return {
 inquiries, stats, loading, error, toast, showToast, hideToast, loadAll,
 search, setSearch, statusFilter, setStatusFilter, dateFilter, setDateFilter,
 showModal, setShowModal, editId, form, setForm, saving,
 openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
 msgModal, openMsg, closeMsg
 };
}
