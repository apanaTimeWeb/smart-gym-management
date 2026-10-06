import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminAnnouncementsModalForm } from '@/app/frontend_admin/admin_announcements/admin_announcements_components/admin_announcements_modal/useAdminAnnouncementsModalForm';

const setShowModal = vi.fn();
const store = { form: { title: '', body: '', priority: 'NORMAL', audience: 'ALL', gymIds: ['all'], publishedAt: '2026-10-05T09:00', expiresAt: '2026-10-10T09:00', isPinned: false } };
vi.mock('@/app/frontend_admin/admin_announcements/admin_announcements_hooks/useAdminAnnouncementsLogic', () => ({ useAdminAnnouncementsLogic: () => ({ showModal: true, setShowModal, editingAnnouncementId: 'a1', saveAnnouncement: vi.fn(), saving: false }) }));
vi.mock('@/app/frontend_admin/admin_announcements/admin_announcements_store/useAdminAnnouncementsStore', () => ({ useAdminAnnouncementsStore: () => store }));
vi.mock('@/app/frontend_admin/admin_announcements/admin_announcements_hooks/useAdminAnnouncementsUnsavedChangesGuard', () => ({ useAdminAnnouncementsUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminAnnouncementsModalForm', () => {
  it('detects edit mode, toggles array values, and closes after confirmation', async () => {
    const { result } = renderHook(() => useAdminAnnouncementsModalForm());
    expect(result.current.isEdit).toBe(true);
    expect(result.current.toggleArrayValue(['email'], 'sms')).toEqual(['email', 'sms']);
    expect(result.current.toggleArrayValue(['email', 'sms'], 'email')).toEqual(['sms']);
    await act(async () => result.current.handleClose());
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
