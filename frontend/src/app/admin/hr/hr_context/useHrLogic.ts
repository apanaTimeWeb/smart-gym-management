// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the HR & Payroll module.
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { hrApi } from '@/app/admin/hr/hr_api/hr_api';
import type { Staff, Payroll, HrSummary } from '@/app/admin/hr/hr_types/hr_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { EMPTY_STAFF } from '@/app/admin/hr/hr_utils/HrSharedConstants';
import { HrContextType, HrInitialData, FetchState } from '@/app/admin/hr/hr_types/hr_types';
import { useConfirm } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

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

  // Read URL parameters directly instead of using useState
  const pathname = usePathname();
  const search = searchParams.get('search') || '';
  const roleFilter = searchParams.get('role') || 'All';
  const payrollMonth = searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const debouncedSearch = useDebounce(search, 300);
  const currentPage = Number(searchParams.get('page')) || 1;

  // Update URL only when debounced search changes
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearch !== currentSearch) {
      setUrlParam('search', debouncedSearch || null);
    }
  }, [debouncedSearch, searchParams, setUrlParam]);

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

  // Rely on URL changes to drive the fetch (plus initial mount)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      
      if (editId) {
        const res = await hrApi.updateStaff(editId, payload);
        const updatedStaff = res.data || payload;
        setStaff(prev => prev.map(s => String(s.id) === String(editId) ? { ...s, ...updatedStaff } as Staff : s));
        showToast(res.message || 'Staff updated successfully', 'success'); 
      } else { 
        const res = await hrApi.createStaff(payload);
        const newStaff = res.data ? res.data : { ...payload, id: `staff-${Date.now()}` } as Staff;
        setStaff(prev => [newStaff, ...prev]);
        setSummary(prev => prev ? { ...prev, totalStaff: prev.totalStaff + 1, activeStaff: prev.activeStaff + 1 } : null);
        showToast(res.message || 'Staff created successfully', 'success'); 
      }
      setShowModal(false);
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editId, showToast]);

  const openAddPayroll = useCallback(() => {
    setShowPayrollModal(true);
  }, []);

  const savePayroll = useCallback(async (data: Partial<Payroll> & { amount?: string | number }) => {
    setSaving(true);
    try {
      const staffMember = staff.find(s => String(s.id) === String(data.staffId));
      const newPayroll = {
        ...data,
        id: `pay-${Date.now()}`,
        amount: Number(data.amount || 0),
        status: 'Paid',
        date: new Date().toISOString(),
        staff: staffMember ? { name: staffMember.name, role: staffMember.role } : undefined
      } as Payroll;
      setPayrolls(prev => [newPayroll, ...prev]);
      setSummary(prev => prev ? { 
        ...prev, 
        totalPayrollThisMonth: prev.totalPayrollThisMonth + (newPayroll.amount || 0),
        paidCount: prev.paidCount + 1 
      } : null);
      showToast('Payroll recorded successfully', 'success');
      setShowPayrollModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [showToast]);

  const deleteStaff = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Remove Staff', message: 'Remove this staff member?', confirmText: 'Remove', type: 'danger' });
    if (!isConfirmed) return;
    try { 
      const res = await hrApi.removeStaff(id);
      setStaff(prev => prev.filter(s => String(s.id) !== String(id)));
      setSummary(prev => prev ? { ...prev, totalStaff: Math.max(0, prev.totalStaff - 1), activeStaff: Math.max(0, prev.activeStaff - 1) } : null);
      showToast(res.message || 'Staff removed successfully', 'success'); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [showToast, confirm]);

  const toggleStaffStatus = useCallback(async (s: Staff) => {
    const newStatus = !s.isActive;
    const actionName = newStatus ? 'Activate' : 'Suspend';
    const isConfirmed = await confirm({ 
      title: `${actionName} Staff`, 
      message: `Are you sure you want to ${actionName.toLowerCase()} ${s.name}?`, 
      confirmText: actionName, 
      type: newStatus ? 'info' : 'danger' 
    });
    if (!isConfirmed) return;
    setSaving(true);
    try {
      const payload: Partial<Staff> = { isActive: newStatus };
      const res = await hrApi.updateStaff(s.id, payload);
      setStaff(prev => prev.map(staff => String(staff.id) === String(s.id) ? { ...staff, isActive: newStatus } as Staff : staff));
      setSummary(prev => prev ? { ...prev, activeStaff: newStatus ? prev.activeStaff + 1 : Math.max(0, prev.activeStaff - 1) } : null);
      showToast(res.message || `Staff ${newStatus ? 'activated' : 'suspended'} successfully`, 'success');
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [showToast, confirm]);

  const markPayrollPaid = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Mark as Paid', message: 'Are you sure you want to mark this payroll as paid?', confirmText: 'Yes, Mark Paid', type: 'info' });
    if (!isConfirmed) return;
    try { 
      setPayrolls(prev => prev.map(p => String(p.id) === String(id) ? { ...p, status: 'Paid' } : p));
      setSummary(prev => prev ? { ...prev, paidCount: prev.paidCount + 1, pendingCount: Math.max(0, prev.pendingCount - 1) } : null);
      showToast('Payroll marked as paid', 'success'); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [showToast, confirm]);



  return {
    staff, payrolls, summary, fetchState, error, toast, showToast, hideToast, loadAll,
    search, debouncedSearch, setSearch, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal, setShowModal, showPayrollModal, setShowPayrollModal, editId, editData, saving, openAdd, openEdit, openAddPayroll, saveStaff, savePayroll, deleteStaff, toggleStaffStatus, markPayrollPaid, payrollMonth, setPayrollMonth
  };
}
