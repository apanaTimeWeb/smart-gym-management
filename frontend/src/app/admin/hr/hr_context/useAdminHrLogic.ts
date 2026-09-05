import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Staff, Payroll, HrSummary, HrContextType, HrInitialData } from '@/app/Admin/hr/hr_types/AdminHrTypes';
import { hrApi } from '@/app/Admin/hr/hr_api/AdminHrApi';
import type { ToastType } from '@/app/Admin/Admin_components/AdminFeedback/AdminToast';
import { EMPTY_STAFF } from '@/app/Admin/hr/hr_utils/AdminHrSharedConstants';
import { useDebounce } from '@/app/Admin/Admin_utils/useDebounce';
import { useAdminHrMutations } from './useAdminHrMutations';

export function useAdminHrLogic(initialData?: HrInitialData | null): HrContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [staff, setStaff] = useState<Staff[]>([]);
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [summary, setSummary] = useState<HrSummary | null>(null);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const roleFilter = searchParams.get('role') || 'All';
  const payrollMonth = searchParams.get('month') || new Date().toISOString().substring(0, 7);
  const debouncedSearch = useDebounce(search, 300);
  const currentSearch = search;

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (initialData) {
      setStaff(initialData.staff);
      setPayrolls(initialData.payrolls);
      setSummary(initialData.summary);
      setFetchState('success');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'month') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      setUrlParam('search', debouncedSearch || null);
    }
  }, [debouncedSearch, searchParams, setUrlParam, currentSearch]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setRoleFilter = useCallback((val: string) => setUrlParam('role', val === 'All' ? null : val), [setUrlParam]);
  const setPayrollMonth = useCallback((val: string) => setUrlParam('month', val), [setUrlParam]);

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
      const staffParams: Record<string, string> = { search: debouncedSearch, page: String(currentPage) };
      if (roleFilter !== 'All') staffParams.role = roleFilter;
      
      const [staffRes, payrollsRes, summaryRes] = await Promise.all([
        hrApi.getStaff(staffParams),
        hrApi.getPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth }),
        hrApi.getSummary()
      ]);
      
      setStaff(staffRes.data.staff || []);
      setPayrolls(payrollsRes.data.payrolls || []);
      setSummary(summaryRes.data || { totalStaff: 0, activeStaff: 0, totalPayrollThisMonth: 0, paidCount: 0, pendingCount: 0 });
      setFetchState('success');
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      showToast(msg, 'error');
      setFetchState('error');
    }
  }, [showToast, debouncedSearch, currentPage, roleFilter, payrollMonth]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialData) return;
    }
    loadAll(); 
  }, [loadAll, initialData]);

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

  const openAddPayroll = useCallback(() => {
    setShowPayrollModal(true);
  }, []);

  const { saveStaff, savePayroll, deleteStaff, toggleStaffStatus, markPayrollPaid } = useAdminHrMutations(
    staff, setStaff, setPayrolls, setSummary, editId, setShowModal, setShowPayrollModal, setSaving, showToast
  );

  return {
    staff, payrolls, summary, fetchState, error, toast, showToast, hideToast, loadAll,
    search, debouncedSearch, setSearch, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal, setShowModal, showPayrollModal, setShowPayrollModal, editId, editData, saving, 
    openAdd, openEdit, openAddPayroll, saveStaff, savePayroll, deleteStaff, toggleStaffStatus, markPayrollPaid, payrollMonth, setPayrollMonth
  };
}
