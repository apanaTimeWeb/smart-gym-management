// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the HR & Payroll module.
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { hrApi } from '@/app/admin/hr/hr_api/hr_api';
import type { Staff, Payroll, HrSummary } from '@/app/admin/hr/hr_types/hr_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { EMPTY_STAFF } from '@/app/admin/hr/hr_utils/HrSharedConstants';
import { HrContextType, HrInitialData, FetchState } from '@/app/admin/hr/hr_types/hr_types';
import { useConfirm } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';
import { useRouter, useSearchParams } from 'next/navigation';

export function useHrLogic(initialData?: HrInitialData | null): HrContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
 const [staff, setStaff] = useState<Staff[]>(initialData?.staff || []);
 const [payrolls, setPayrolls] = useState<Payroll[]>(initialData?.payrolls || []);
 const [summary, setSummary] = useState<HrSummary | null>(initialData?.summary || null);
 const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
 const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Local state for immediate typing feedback
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search, 300);
  const currentPage = Number(searchParams.get('page')) || 1;

  // Update URL only when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      if (params.get('search') !== debouncedSearch) {
        params.set('search', debouncedSearch);
        params.set('page', '1');
        router.push(`?${params.toString()}`, { scroll: false });
      }
    } else {
      if (params.has('search')) {
        params.delete('search');
        params.set('page', '1');
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [debouncedSearch, router, searchParams]);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

 const [showModal, setShowModal] = useState(false);
 const [showPayrollModal, setShowPayrollModal] = useState(false);
 const [editId, setEditId] = useState<string | null>(null);
 const [editData, setEditData] = useState<Partial<Staff> | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      // Mocking fetch success
      const mockStaff: Staff[] = [
        { id: '1', name: 'Alice Admin', email: 'alice@gym.com', phone: '1234567890', role: 'Manager', salary: 6000, branch: 'Main', gender: 'FEMALE', joinDate: new Date().toISOString(), isActive: true }
      ];
      const mockPayrolls: Payroll[] = [];
      const mockSummary: HrSummary = { totalStaff: 1, activeStaff: 1, totalPayrollThisMonth: 0, paidCount: 0, pendingCount: 0 };
      
      setStaff(mockStaff);
      setPayrolls(mockPayrolls);
      setSummary(mockSummary);
      setFetchState('success');
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      showToast(msg, 'error');
      setFetchState('error');
    }
  }, [showToast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const openAdd = useCallback(() => {
    setEditId(null);
    setEditData(EMPTY_STAFF);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((s: Staff) => {
    setEditId(s.id);
    setEditData({ 
      name: s.name, 
      email: s.email, 
      phone: s.phone, 
      role: s.role, 
      salary: s.salary, 
      branch: s.branch, 
      gender: s.gender, 
      address: s.address || '', 
      joinDate: new Date(s.joinDate).toISOString().split('T')[0] 
    });
    setShowModal(true);
  }, []);

  const saveStaff = useCallback(async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
    setSaving(true);
    try {
      const payload: Partial<Staff> = { 
        ...data, 
        salary: Number(data.salary || 0), 
        joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : new Date().toISOString(), 
        isActive: true 
      };
      // Mocking save success
      if (editId) {
        setStaff(prev => prev.map(s => s.id === editId ? { ...s, ...payload } as Staff : s));
        showToast('Staff updated successfully', 'success'); 
      } else {
        const newStaff = { id: `s${Date.now()}`, ...payload } as Staff;
        setStaff(prev => [newStaff, ...prev]);
        showToast('Staff created successfully', 'success'); 
      }
      setShowModal(false);
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editId, loadAll, showToast]);

  const openAddPayroll = useCallback(() => {
    setShowPayrollModal(true);
  }, []);

  const savePayroll = useCallback(async (data: Partial<Payroll> & { amount?: string | number }) => {
    setSaving(true);
    try {
      // Mocking save success
      const newPayroll = { id: `pr${Date.now()}`, ...data } as Payroll;
      setPayrolls(prev => [newPayroll, ...prev]);
      showToast('Payroll recorded successfully', 'success');
      setShowPayrollModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [loadAll, showToast]);

  const deleteStaff = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Remove Staff', message: 'Remove this staff member?', confirmText: 'Remove', type: 'danger' });
    if (!isConfirmed) return;
    try { 
      // Mocking delete success
      showToast('Staff removed successfully', 'success'); 
      await loadAll(); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [loadAll, showToast, confirm]);

  const markPayrollPaid = useCallback(async (id: string) => {
    try { 
      // Mocking mark paid success
      showToast('Payroll marked as paid', 'success'); 
      await loadAll(); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [loadAll, showToast]);

  return {
    staff, payrolls, summary, fetchState, error, toast, showToast, hideToast, loadAll,
    search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, showPayrollModal, setShowPayrollModal, editId, editData, saving, openAdd, openEdit, openAddPayroll, saveStaff, savePayroll, deleteStaff, markPayrollPaid
  };
}
