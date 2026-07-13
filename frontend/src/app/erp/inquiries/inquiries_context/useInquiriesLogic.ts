import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { inquiriesApi, type Inquiry, type InquiryStats } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';
import { EMPTY_INQUIRY_FORM, generateDefaultMessage } from '@/app/erp/inquiries/inquiries_utils/InquiriesSharedConstants';
import { InquiriesContextType } from '@/app/erp/inquiries/inquiries_types/inquiries_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

export function useInquiriesLogic(): InquiriesContextType {
  const { confirm } = useConfirm();
 const [inquiries, setInquiries] = useState<Inquiry[]>([]);
 const [stats, setStats] = useState<InquiryStats | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInquiries, setTotalInquiries] = useState(0);
 
 const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const [showModal, setShowModal] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [editData, setEditData] = useState<any>(null);
 const [saving, setSaving] = useState(false);
 
  const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
  const closeMsg = useCallback(() => setMsgModal(null), []);

  // Selection & Bulk Msg
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleSelectAll = useCallback((selectAll: boolean) => {
    setSelectedIds(selectAll ? inquiries.map(i => i.id) : []);
  }, [inquiries]);
  const toggleSelectOne = useCallback((id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);
  const clearSelection = useCallback(() => setSelectedIds([]), []);

  const [bulkMsgModal, setBulkMsgModal] = useState<{ open: boolean; type: MessageType; recipients: ErpMessageRecipient[] } | null>(null);
  const openBulkMsg = useCallback((type: MessageType) => {
    const recipients = inquiries
      .filter(i => selectedIds.includes(i.id))
      .map(i => ({ name: i.name, phone: i.phone, email: i.email || '' }));
    setBulkMsgModal({ open: true, type, recipients });
  }, [inquiries, selectedIds]);
  const closeBulkMsg = useCallback(() => setBulkMsgModal(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: Record<string, string> = {
        limit: '10',
        page: currentPage.toString()
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'All') params.status = statusFilter;
      // You can add dateFilter passing here if backend supports

      const [inqRes, statsRes] = await Promise.all([
        inquiriesApi.getAll(params),
        inquiriesApi.getStats(),
      ]);
      setInquiries(inqRes.data.inquiries || []);
      setTotalInquiries(inqRes.data.total || 0);
      setStats(statsRes.data);
      setSelectedIds([]); // Clear selection when data reloads (e.g. page change)
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast, currentPage, debouncedSearch, statusFilter]);

 useEffect(() => { loadAll(); }, [loadAll]);

 const openAdd = useCallback(() => {
 setEditId(null);
 setEditData(EMPTY_INQUIRY_FORM);
 setShowModal(true);
 }, []);

 const openEdit = useCallback((inq: Inquiry) => {
 setEditId(inq.id);
 setEditData({ 
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

 const saveInquiry = useCallback(async (data: any) => {
 setSaving(true);
 try {
 if (editId) { 
 const res = await inquiriesApi.update(editId, data); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await inquiriesApi.create(data); 
 showToast((res as any).message, 'success'); 
 }
 setShowModal(false);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editId, loadAll, showToast]);

 const deleteInquiry = useCallback(async (id: number) => {
  const isConfirmed = await confirm({ title: 'Delete Inquiry', message: 'Delete this inquiry?', confirmText: 'Delete', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await inquiriesApi.remove(id); 
 showToast((res as any).message, 'success'); 
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
    inquiries, stats, loading, error, toast, showToast, hideToast, loadAll, totalInquiries,
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, dateFilter, setDateFilter, currentPage, setCurrentPage,
    selectedIds, toggleSelectAll, toggleSelectOne, clearSelection,
    showModal, setShowModal, editId, editData, saving,
    openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal, openMsg, closeMsg,
    bulkMsgModal, openBulkMsg, closeBulkMsg
  };
}
