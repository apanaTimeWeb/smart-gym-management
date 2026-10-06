import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminBlacklistModalForm } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_modal/useAdminBlacklistModalForm';

const setShowModal = vi.fn();
const saveBlacklist = vi.fn();
const store = { showModal: true, setShowModal, form: { scope: 'SELECTED_GYMS', assignedGyms: ['g1'] }, saveBlacklist, saving: false };
vi.mock('@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistLogic', () => ({ useAdminBlacklistLogic: () => store }));
vi.mock('@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistUnsavedChangesGuard', () => ({ useAdminBlacklistUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminBlacklistModalForm', () => {
  beforeEach(() => setShowModal.mockReset());

  it('keeps module scope selection and toggles individual gyms', () => {
    const { result } = renderHook(() => useAdminBlacklistModalForm());
    expect(result.current.scope).toBe('SELECTED_GYMS');
    expect(result.current.selectedGyms).toEqual(['g1']);
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual(['g1', 'g2']);
    act(() => result.current.toggleGym('g1'));
    expect(result.current.selectedGyms).toEqual(['g2']);
    act(() => result.current.toggleGym('all'));
    expect(result.current.selectedGyms).toEqual(['all']);
  });
});
