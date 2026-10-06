import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';

describe('useAdminLayoutToastStore', () => {
  beforeEach(() => useAdminLayoutToastStore.setState({ toast: null }));

  it('stores a new toast with a stable identity', () => {
    useAdminLayoutToastStore.getState().showToast('Saved', 'success', 'save-1');
    expect(useAdminLayoutToastStore.getState().toast).toEqual({ id: 'save-1', message: 'Saved', type: 'success' });
  });

  it('deduplicates an identical toast identity', () => {
    const store = useAdminLayoutToastStore.getState();
    store.showToast('Saved', 'success', 'save-1');
    const first = useAdminLayoutToastStore.getState().toast;
    store.showToast('Saved again', 'success', 'save-1');
    expect(useAdminLayoutToastStore.getState().toast).toBe(first);
  });

  it('clears the toast when hidden', () => {
    useAdminLayoutToastStore.getState().showToast('Saved', 'success', 'save-1');
    useAdminLayoutToastStore.getState().hideToast();
    expect(useAdminLayoutToastStore.getState().toast).toBeNull();
  });
});
