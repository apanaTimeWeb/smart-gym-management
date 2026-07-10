import { useState, useCallback, useEffect } from 'react';
import { hrApi, type Staff, type Payroll, type HrSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_STAFF } from '@/app/(erp)/hr/hr_utils/HrSharedConstants';
import { HrContextType } from '@/app/(erp)/hr/hr_types/hr_types';
import { useConfirm } from '@/app/(erp)/erp_components/ErpConfirmProvider';

export function useHrLogic(): HrContextType {
  const { confirm } = useConfirm();
 const [staff, setStaff] = useState<Staff[]>([]);
 const [payrolls, setPayrolls] = useState<Payroll[]>([]);
 const [summary, setSummary] = useState<HrSummary | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

 const [showModal, setShowModal] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [form, setForm] = useState(EMPTY_STAFF);
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
  setStaff(Array.isArray(staffRes.data) ? staffRes.data : (staffRes.data as any).staff || []);
  setPayrolls(Array.isArray(payrollRes.data) ? payrollRes.data : (payrollRes.data as any).payrolls || []);
 setSummary(summaryRes.data);
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
 setForm(EMPTY_STAFF);
 setShowModal(true);
 }, []);

 const openEdit = useCallback((s: Staff) => {
 setEditId(s.id);
 setForm({ 
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

 const saveStaff = useCallback(async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 try {
 const payload = { ...form, salary: Number(form.salary), joinDate: new Date(form.joinDate).toISOString() };
 if (editId) { 
 const res = await hrApi.updateStaff(editId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await hrApi.createStaff(payload); 
 showToast((res as any).message, 'success'); 
 }
 setShowModal(false);
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [form, editId, loadAll, showToast]);

 const deleteStaff = useCallback(async (id: number) => {
  const isConfirmed = await confirm({ title: 'Remove Staff', message: 'Remove this staff member?', confirmText: 'Remove', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await hrApi.removeStaff(id); 
 showToast((res as any).message, 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);

 const markPayrollPaid = useCallback(async (id: number) => {
 try { 
 const res = await hrApi.updatePayrollStatus(id, 'Paid'); 
 showToast((res as any).message, 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);

  return {
    staff, payrolls, summary, loading, error, toast, showToast, hideToast, loadAll,
    search, setSearch, currentPage, setCurrentPage,
    showModal, setShowModal, editId, form, setForm, saving, openAdd, openEdit, saveStaff, deleteStaff, markPayrollPaid
  };
}
