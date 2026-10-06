import { describe, expect, it } from 'vitest';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';

describe('getAdminBackendMessage', () => {
  it('returns a supplied Error message', () => {
    expect(getAdminBackendMessage(new Error('Backend rejected the request.'))).toBe('Backend rejected the request.');
  });

  it('returns no invented message when the error has no backend message', () => {
    expect(getAdminBackendMessage({ code: 'UNKNOWN' })).toBeNull();
  });
});
