// DATA FLOW: Manager module state/API data → useManagerHrUIState → owning Manager UI components.
/** Manages UseHrUIState for the Manager module. */
import { useState, useCallback } from 'react';
import type { Staff } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { EMPTY_STAFF } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';

export function useManagerHrUIState() {
  const [showModal, setShowModal] = useState(false);
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{ payrollId: string; staffName: string; pendingAmount: number; } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Staff> | null>(null);
  const [viewProfileData, setViewProfileData] = useState<Staff | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

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
      aadhaar: s.aadhaar || '',
      upiId: s.upiId || '',
      advanceSalary: s.advanceSalary || 0,
      isActive: s.isActive,
      joinDate: new Date(s.joinDate).toISOString().split('T')[0] 
    });
    setShowModal(true);
  }, []);

  const openAddPayroll = useCallback(() => {
    setShowPayrollModal(true);
  }, []);

  return {
    showModal, setShowModal,
    showPayrollModal, setShowPayrollModal,
    paymentModal, setPaymentModal,
    editId, setEditId,
    editData, setEditData,
    viewProfileData, setViewProfileData,
    saving, setSaving,
    toast, showToast, hideToast,
    openAdd, openEdit, openAddPayroll
  };
}
