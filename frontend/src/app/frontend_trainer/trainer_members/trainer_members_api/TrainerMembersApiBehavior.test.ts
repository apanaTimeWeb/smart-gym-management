import { describe, expect, it, vi } from 'vitest';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/trainer_members_api/TrainerMembersApi';

import { TRAINER_MEMBERS_MOCK_MEMBERS } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_fixtures/TrainerMembersMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer members API behavior', () => {
  it('forwards search, status, page, and limit to the member list endpoint', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { members: [TRAINER_MEMBERS_MOCK_MEMBERS[0]], total: 1, page: 1, limit: 10 } });
    const result = await TrainerMembersApi.fetchMembers({ search: 'Rahul', status: 'ACTIVE', page: '1', limit: '10' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Rahul');
    expect(apiFetch.mock.calls[0][0]).toContain('status=ACTIVE');
    expect(result.data?.members[0]?.name).toBe('Rahul Sharma');
  });
  it('sends member updates through the module API and returns the server representation', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'TrainerMembersMember updated', data: TRAINER_MEMBERS_MOCK_MEMBERS[0] });
    const result = await TrainerMembersApi.updateMember('MEM-001', { phone: '9000000000' }, 'members-update-test-key');
    expect(apiFetch.mock.calls[0][0]).toContain('MEM-001');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH' });
    expect(result.data?.id).toBe('MEM-001');
  });
});
