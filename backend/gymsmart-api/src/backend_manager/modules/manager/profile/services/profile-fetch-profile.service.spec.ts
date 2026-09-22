// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ProfileFetchProfileService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ProfileFetchProfileService.fetchProfile -> observable return/delegation.
import { ProfileFetchProfileService } from '@/backend_manager/modules/manager/profile/services/profile-fetch-profile.service';

describe('ProfileFetchProfileService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'profile' } as const;
    const dependency = { fetchProfile: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ProfileFetchProfileService(dependency as never);
    const result = await service.fetchProfile({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchProfile as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
