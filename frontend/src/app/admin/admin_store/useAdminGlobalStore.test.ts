// RESPONSIBILITY: Tests for useAdminGlobalStore — verifies store state and actions per Rule 15A.
import { describe, it, expect, beforeEach } from 'vitest';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';

describe('useAdminGlobalStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useAdminGlobalStore.setState({ selectedBranchId: 'all' });
  });

  it('initializes with selectedBranchId as "all"', () => {
    const { selectedBranchId } = useAdminGlobalStore.getState();
    expect(selectedBranchId).toBe('all');
  });

  it('setSelectedBranchId updates the selected branch', () => {
    const { setSelectedBranchId } = useAdminGlobalStore.getState();
    setSelectedBranchId('branch-123');
    expect(useAdminGlobalStore.getState().selectedBranchId).toBe('branch-123');
  });

  it('setSelectedBranchId can reset back to "all"', () => {
    const { setSelectedBranchId } = useAdminGlobalStore.getState();
    setSelectedBranchId('branch-abc');
    setSelectedBranchId('all');
    expect(useAdminGlobalStore.getState().selectedBranchId).toBe('all');
  });

  it('multiple calls to setSelectedBranchId keep only the last value', () => {
    const { setSelectedBranchId } = useAdminGlobalStore.getState();
    setSelectedBranchId('b1');
    setSelectedBranchId('b2');
    setSelectedBranchId('b3');
    expect(useAdminGlobalStore.getState().selectedBranchId).toBe('b3');
  });
});
