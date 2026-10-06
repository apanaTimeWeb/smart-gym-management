import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_announcements/admin_announcements_store/useAdminAnnouncementsStore';

describe('useAdminAnnouncementsStore', () => {
  beforeEach(() => {
    useAdminAnnouncementsStore.setState({ editingAnnouncementId: null });
  });

  it('stores only the selected announcement identity for edit mode', () => {
    useAdminAnnouncementsStore.getState().setEditingAnnouncementId('announcement-001');
    expect(useAdminAnnouncementsStore.getState().editingAnnouncementId).toBe('announcement-001');
    expect('editingAnnouncement' in useAdminAnnouncementsStore.getState()).toBe(false);
  });
});
