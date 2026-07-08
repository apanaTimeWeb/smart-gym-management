"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { inquiriesApi, type Inquiry, type InquiryStats } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import type { MessageType, ErpMessageRecipient } from '@/app/(erp)/erp_components/ErpMessageModal';
import { EMPTY_INQUIRY_FORM, generateDefaultMessage } from '../inquiries_utils/InquiriesSharedConstants';

interface InquiriesContextType {
  inquiries: Inquiry[];
  stats: InquiryStats | null;
  loading: boolean;
  error: string;
  toast: { message: string; type: ToastType } | null;
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  dateFilter: string;
  setDateFilter: (s: string) => void;
  
  // Modal State
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: number | null;
  form: typeof EMPTY_INQUIRY_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_INQUIRY_FORM>>;
  saving: boolean;
  
  // Actions
  openAdd: () => void;
  openEdit: (inq: Inquiry) => void;
  saveInquiry: (e: React.FormEvent) => Promise<void>;
  deleteInquiry: (id: number) => Promise<void>;
  updateStatus: (id: number, status: string) => Promise<void>;
  
  // Message Modal State
  msgModal: { open: boolean; recipient: ErpMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (inq: Inquiry, type: MessageType) => void;
  closeMsg: () => void;
}

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

export function InquiriesProvider({ children }: { children: React.ReactNode }) {
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
  
  const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ErpErpMessageRecipient; type: MessageType; message: string } | null>(null);
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

  const value = useMemo(() => ({
    inquiries, stats, loading, error, toast, showToast, hideToast, loadAll,
    search, setSearch, statusFilter, setStatusFilter,
    showModal, setShowModal, editId, form, setForm, saving,
    openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal, openMsg, closeMsg
  }), [
    inquiries, stats, loading, error, toast, showToast, hideToast, loadAll,
    search, statusFilter, showModal, editId, form, saving,
    openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal, openMsg, closeMsg
  ]);

  return (
    <InquiriesContext.Provider value={value}>
      {children}
    </InquiriesContext.Provider>
  );
}

export function useInquiriesContext() {
  const context = useContext(InquiriesContext);
  if (context === undefined) {
    throw new Error('useInquiriesContext must be used within an InquiriesProvider');
  }
  return context;
}
