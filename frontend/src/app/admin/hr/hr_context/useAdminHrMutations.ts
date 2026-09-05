import { useCallback } from 'react';
import type { Staff, Payroll, HrSummary } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { useConfirm } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';

export function useAdminHrMutations(
  staff: Staff[],
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>,
  setPayrolls: React.Dispatch<React.SetStateAction<Payroll[]>>,
  setSummary: React.Dispatch<React.SetStateAction<HrSummary | null>>,
  editId: string | null,
  setShowModal: (s: boolean) => void,
  setShowPayrollModal: (s: boolean) => void,
  setSaving: (s: boolean) => void,
  showToast: (msg: string, t: ToastType) => void
) {
  const { confirm } = useConfirm();

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
  }, [editId, showToast, setStaff, setSummary, setShowModal, setSaving]);

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
  }, [showToast, staff, setPayrolls, setSummary, setShowPayrollModal, setSaving]);

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
  }, [showToast, confirm, setStaff, setSummary]);

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
  }, [showToast, confirm, setSaving, setStaff, setSummary]);

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
  }, [showToast, confirm, setPayrolls, setSummary]);

  return {
    saveStaff,
    savePayroll,
    deleteStaff,
    toggleStaffStatus,
    markPayrollPaid
  };
}
