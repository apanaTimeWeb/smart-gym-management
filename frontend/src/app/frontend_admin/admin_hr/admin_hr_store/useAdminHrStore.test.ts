import { act } from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useAdminHrStore } from '@/app/frontend_admin/admin_hr/admin_hr_store/useAdminHrStore';
import type { Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';

const staff: Staff = {
  id: 'staff-1',
  name: 'Demo Staff',
  email: 'demo@example.com',
  phone: '9876543210',
  role: 'Admin',
  salary: 25000,
  branch: 'branch-1',
  gender: 'OTHER',
  joinDate: '2026-01-01',
  isActive: true,
};

describe('useAdminHrStore', () => {
  beforeEach(() => {
    useAdminHrStore.setState({
      visibleColumns: ['name', 'role', 'phone', 'salary', 'status', 'actions'],
      showModal: false,
      showPayrollModal: false,
      showProfileModal: false,
      paymentModal: null,
      editId: null,
    });
  });

  it('opens add and edit profile workflows with incompatible modal state cleared', () => {
    act(() => useAdminHrStore.getState().openEdit(staff));
    let state = useAdminHrStore.getState();
    expect(state.editId).toBe('staff-1');
    expect(state.showModal).toBe(true);
    expect(state.showProfileModal).toBe(false);

    act(() => useAdminHrStore.getState().openProfile(staff));
    state = useAdminHrStore.getState();
    expect(state.editId).toBe('staff-1');
    expect(state.showProfileModal).toBe(true);
    expect(state.showModal).toBe(false);
  });

  it('opens payroll and add flows independently', () => {
    act(() => useAdminHrStore.getState().openAddPayroll());
    expect(useAdminHrStore.getState().showPayrollModal).toBe(true);

    act(() => useAdminHrStore.getState().openAdd());
    const state = useAdminHrStore.getState();
    expect(state.showModal).toBe(true);
    expect(state.editId).toBeNull();
    expect(state.showProfileModal).toBe(false);
  });
});
