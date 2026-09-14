import { useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import type { Inquiry, InquiriesContextType } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { MessageType, ManagerMessageRecipient } from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';
import { EMPTY_INQUIRY_FORM, generateDefaultMessage, type InquiryFormValues } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';
import { useInquiriesQuery, useInquiryStatsQuery } from '@/app/manager/inquiries/inquiries_api/useManagerInquiriesQueries';
import { useManagerInquiriesMutations } from '@/app/manager/inquiries/inquiries_api/useManagerInquiriesMutations';

/**
 * Hook to manage inquiries data, filtering state, and all CRUD operations.
 */
export function useManagerInquiriesLogic(): InquiriesContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read filter state from URL (Rule 42 — URL as State)
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';
  const dateFilter = searchParams.get('date') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useDebounce(search, 300);

  // Sync filter state back to URL
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setDateFilter = useCallback((val: string) => setUrlParam('date', val === 'all' ? null : val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<InquiryFormValues | null>(null);

  const [msgModal, setMsgModal] = useState<{ open: boolean; recipient: ManagerMessageRecipient; type: MessageType; message: string; subject?: string } | null>(null);
  const closeMsg = useCallback(() => setMsgModal(null), []);

  const [convertLead, setConvertLead] = useState<Inquiry | null>(null);
  const openConvert = useCallback((inq: Inquiry) => setConvertLead(inq), []);
  const closeConvert = useCallback(() => setConvertLead(null), []);

  // React Query data fetching
  const queryParams: Record<string, string> = {};

  const { data: inqData, isLoading: isListLoading, isError: isListError } = useInquiriesQuery(queryParams);
  const { data: statsData, isLoading: isStatsLoading } = useInquiryStatsQuery();
  
  const inquiries = inqData?.inquiries || [];
  const totalInquiries = inqData?.total || 0;
  const stats = statsData || null;
  const isLoading = isListLoading || isStatsLoading;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toggleSelectAll = useCallback((selectAll: boolean) => {
    setSelectedIds(selectAll ? inquiries.map(i => i.id) : []);
  }, [inquiries]);
  const toggleSelectOne = useCallback((id: string) => {
    setSelectedIds(prev => prev?.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);
  const clearSelection = useCallback(() => setSelectedIds([]), []);

  const [bulkMsgModal, setBulkMsgModal] = useState<{ open: boolean; type: MessageType; recipients: ManagerMessageRecipient[] } | null>(null);
  const openBulkMsg = useCallback((type: MessageType) => {
    const recipients = inquiries
      .filter(i => selectedIds?.includes(i.id))
      .map(i => ({ name: i.name, phone: i.phone, email: i.email || '' }));
    setBulkMsgModal({ open: true, type, recipients });
  }, [inquiries, selectedIds]);
  const closeBulkMsg = useCallback(() => setBulkMsgModal(null), []);

  const openAdd = useCallback(() => {
    setEditId(null);
    setEditData(EMPTY_INQUIRY_FORM as InquiryFormValues);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((inq: Inquiry) => {
    setEditId(inq.id);
    setEditData({
      name: inq.name,
      phone: inq.phone,
      email: inq.email || '',
      interest: inq.interest,
      status: inq.status as InquiryFormValues['status'],
      source: inq.source || 'Walk-in',
      notes: inq.notes || '',
    });
    setShowModal(true);
  }, []);

  const { createInquiry, updateInquiry, deleteInquiry: removeInq, isCreating, isUpdating } = useManagerInquiriesMutations({
    showToast,
    onSuccessCallback: () => {
      setShowModal(false);
      setConvertLead(null);
    }
  });

  const saveInquiry = async (data: InquiryFormValues) => {
    if (editId) {
      updateInquiry({ id: editId, data });
    } else {
      createInquiry(data);
    }
  };

  const deleteInquiry = async (id: string) => {
    removeInq(id);
  };

  const updateStatus = async (id: string, status: string) => {
    updateInquiry({ id, data: { status: status as InquiryFormValues['status'] } });
  };

  const openMsg = useCallback((inq: Inquiry, type: MessageType) => {
    const msg = generateDefaultMessage(inq.name, inq.interest);
    setMsgModal({ open: true, type, recipient: { name: inq.name, phone: inq.phone, email: inq.email || '' }, message: msg });
  }, []);

  return {
    inquiries, stats, isLoading, isError: isListError, toast, showToast, hideToast, totalInquiries,
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, dateFilter, setDateFilter, currentPage, setCurrentPage,
    selectedIds, toggleSelectAll, toggleSelectOne, clearSelection,
    showModal, setShowModal, editId, editData, saving: isCreating || isUpdating,
    openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal, openMsg, closeMsg,
    bulkMsgModal, openBulkMsg, closeBulkMsg,
    convertLead, openConvert, closeConvert,
  };
}
