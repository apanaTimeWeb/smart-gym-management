import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminMembersApi } from '@/app/frontend_admin/admin_members/admin_members_api/AdminMembersApi';
import { apiFetch } from '@/lib/api';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminMembersApi.fetchSummary', () => {
  beforeEach(() => vi.clearAllMocks());

  it('carries branch identity into the summary request', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, message: 'ok', data: { totalMembers: 0 } });

    await AdminMembersApi.fetchSummary('b2');

    expect(apiFetch).toHaveBeenCalledWith(
      expect.stringContaining('/summary?branchId=b2'),
      expect.objectContaining({ dataSchema: expect.anything() }),
    );
  });

  it('omits the branch query for the all-branches summary', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, message: 'ok', data: { totalMembers: 0 } });

    await AdminMembersApi.fetchSummary();

    expect(apiFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/summary$/),
      expect.objectContaining({ dataSchema: expect.anything() }),
    );
  });
});
