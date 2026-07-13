// RESPONSIBILITY: useHrLogic.ts handles the logic and UI for its corresponding feature.
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { hrApi, type Staff, type Payroll, type HrSummary } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_STAFF } from '@/app/erp/hr/hr_utils/HrSharedConstants';
import { HrContextType, HrInitialData } from '@/app/erp/hr/hr_types/hr_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';
import { useRouter, useSearchParams } from 'next/navigation';

export function useHrLogic(initialData?: HrInitialData | null): HrContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
 const [staff, setStaff] = useState<Staff[]>(initialData?.staff || []);
 const [payrolls, setPayrolls] = useState<Payroll[]>(initialData?.payrolls || []);
 const [summary, setSummary] = useState<HrSummary | null>(initialData?.summary || null);
 const [loading, setLoading] = useState(!initialData);
 const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const search = searchParams.get('search') || '';
  const debouncedSearch = useDebounce(search, 300);
  const currentPage = Number(searchParams.get('page')) || 1;

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) { params.set('search', val); params.set('page', '1'); }
    else { params.delete('search'); params.set('page', '1'); }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

 const [showModal, setShowModal] = useState(false);
 const [showPayrollModal, setShowPayrollModal] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [editData, setEditData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
  setLoading(true);
  setError('');
  try {
  const [staffRes, payrollRes, summaryRes] = await Promise.all([
  hrApi.getStaff(),
  hrApi.getPayrolls(),
  hrApi.getSummary(),
  ]);
   setStaff(staffRes.data?.staff || staffRes.data || []);
   setPayrolls(payrollRes.data?.payrolls || payrollRes.data || []);
  setSummary(summaryRes.data || null);
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

 const saveStaff = useCallback(async (data: Record<string, any>) => {
 setSaving(true);
 try {
 const payload = { ...data, salary: Number(data.salary), joinDate: new Date(data.joinDate).toISOString(), isActive: true };
 if (editId) { 
 const res = await hrApi.updateStaff(editId, payload) as unknown as { message?: string }; 
 showToast(res.message || 'Staff updated successfully', 'success'); 
 } else { 
 const res = await hrApi.createStaff(payload) as unknown as { message?: string }; 
 showToast(res.message || 'Staff created successfully', 'success'); 
 }
 setShowModal(false);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editId, loadAll, showToast]);

 const openAddPayroll = useCallback(() => {
   setShowPayrollModal(true);
 }, []);

   const savePayroll = useCallback(async (data: Record<string, any>) => {
     setSaving(true);
     try {
       const payload = { ...data, amount: Number(data.amount), status: 'DUE' };
       const res = await hrApi.createPayroll(payload) as unknown as { message?: string };
       showToast(res.message || 'Payroll recorded successfully', 'success');
      setShowPayrollModal(false);
      await loadAll();
   } catch (err) {
     showToast((err as Error).message, 'error');
   } finally {
     setSaving(false);
   }
 }, [loadAll, showToast]);

 const deleteStaff = useCallback(async (id: number) => {
  const isConfirmed = await confirm({ title: 'Remove Staff', message: 'Remove this staff member?', confirmText: 'Remove', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await hrApi.removeStaff(id) as unknown as { message?: string }; 
 showToast(res.message || 'Staff removed successfully', 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);

 const markPayrollPaid = useCallback(async (id: number) => {
  try { 
 const res = await hrApi.updatePayrollStatus(id, 'Paid') as unknown as { message?: string }; 
 showToast(res.message || 'Payroll marked as paid', 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);

  return {
    staff, payrolls, summary, loading, error, toast, showToast, hideToast, loadAll,
    search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, showPayrollModal, setShowPayrollModal, editId, editData, saving, openAdd, openEdit, openAddPayroll, saveStaff, savePayroll, deleteStaff, markPayrollPaid
  };
}
