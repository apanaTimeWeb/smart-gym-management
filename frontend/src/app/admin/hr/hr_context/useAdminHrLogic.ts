// RESPONSIBILITY: Core data logic hook for the admin module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import React, { useState, useCallback, useEffect } from 'react';
import type { Staff, Payroll, HrSummary, HrContextType, HrInitialData } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { EMPTY_STAFF } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { useAdminHrStaffMutations } from '@/app/admin/hr/hr_context/useAdminHrStaffMutations';
import { useAdminHrPayrollMutations } from '@/app/admin/hr/hr_context/useAdminHrPayrollMutations';
import { useAdminHrUrlState } from '@/app/admin/hr/hr_context/useAdminHrUrlState';
import { useAdminHrModalState } from '@/app/admin/hr/hr_context/useAdminHrModalState';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';

export function useAdminHrLogic(initialData?: HrInitialData | null): HrContextType {
  const { showToast } = useAdminToastStore();
  const {
    search, currentPage, roleFilter, branchFilter, payrollMonth,
    debouncedSearch, setSearch, setCurrentPage, setRoleFilter, setBranchFilter, setPayrollMonth,
  } = useAdminHrUrlState();

  const {
    showModal, setShowModal, showPayrollModal, setShowPayrollModal,
    showProfileModal, setShowProfileModal, paymentModal, setPaymentModal,
    editId, setEditId, editData, setEditData, viewProfileData, setViewProfileData, saving, setSaving,
  } = useAdminHrModalState();

  const { selectedBranchId } = useAdminGlobalStore();

  const [staff, setStaff] = useState<Staff[]>(initialData?.staff || []);
  const [payrolls, setPayrolls] = useState<Payroll[]>(initialData?.payrolls || []);
  const [summary, setSummary] = useState<HrSummary | null>(initialData?.summary || null);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'role', 'phone', 'salary', 'status', 'actions']);
  const isFirstRender = React.useRef(true);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      const staffParams: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId };
      if (roleFilter !== 'All') staffParams.role = roleFilter;
      if (branchFilter !== 'All') staffParams.branch = branchFilter;
      
      const [staffRes, payrollsRes, summaryRes] = await Promise.all([
        hrApi.getStaff(staffParams),
        hrApi.getPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth, branchId: selectedBranchId }),
        hrApi.getSummary(selectedBranchId)
      ]);
      
      let fetchedStaff = staffRes.data?.staff || [];
      let fetchedPayrolls = payrollsRes.data?.payrolls || [];

      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        fetchedStaff = fetchedStaff.filter((s: Staff) => 
          (s.name && s.name?.toLowerCase().includes(q)) || 
          (s.phone && s.phone?.includes(q)) || 
          (s.email && s.email?.toLowerCase().includes(q))
        );
        fetchedPayrolls = fetchedPayrolls.filter((p: Payroll) => 
          p.staff?.name && p.staff.name?.toLowerCase().includes(q)
        );
      }

      if (roleFilter !== 'All') {
        fetchedStaff = fetchedStaff.filter((s: Staff) => s.role === roleFilter);
      }
      
      setStaff(fetchedStaff);
      setPayrolls(fetchedPayrolls);
      setSummary(summaryRes.data || { totalSalaryThisMonth: 0, totalSalaryPaid: 0, totalSalaryDue: 0, totalAdvanceGiven: 0, pendingPaymentsCount: 0, totalStaff: 0, activeStaff: 0, totalPayrollThisMonth: 0, paidCount: 0, pendingCount: 0 });
      setFetchState('success');
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      showToast(msg, 'error');
      setFetchState('error');
    }
  }, [showToast, debouncedSearch, currentPage, roleFilter, branchFilter, payrollMonth, selectedBranchId]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
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
      joinDate: new Date(s.joinDate).toISOString().split('T')[0],
      assignedBranches: s.assignedBranches || [],
      primaryBranchId: s.primaryBranchId || s.branch
    });
    setShowProfileModal(false); // Close profile if open
    setShowModal(true);
  }, []);

  const openProfile = useCallback((s: Staff) => {
    setEditId(s.id);
    setEditData({ 
      ...s,
      joinDate: new Date(s.joinDate).toISOString().split('T')[0]
    });
    setShowProfileModal(true);
  }, []);

  const openAddPayroll = useCallback(() => {
    setShowPayrollModal(true);
  }, []);

  const { saveStaff, deleteStaff, toggleStaffStatus } = useAdminHrStaffMutations(
    staff, setStaff, setSummary, editId, setShowModal, setSaving, showToast
  );

  const { savePayroll, markPayrollPaid, giveAdvance, payDue } = useAdminHrPayrollMutations(
    staff, payrolls, setStaff, setPayrolls, setSummary, setShowPayrollModal, setSaving, showToast
  );

  return {
    staff, payrolls, summary, fetchState, error, showToast, loadAll,
    search, debouncedSearch, setSearch, branchFilter, setBranchFilter, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal, setShowModal, showPayrollModal, setShowPayrollModal, showProfileModal, setShowProfileModal, paymentModal, setPaymentModal, editId, editData, viewProfileData, setViewProfileData, saving, 
    openAdd, openEdit, openProfile, openAddPayroll, saveStaff, savePayroll, deleteStaff, toggleStaffStatus, markPayrollPaid, giveAdvance, payDue, payrollMonth, setPayrollMonth,
    visibleColumns,
    setVisibleColumns,
  };
}
