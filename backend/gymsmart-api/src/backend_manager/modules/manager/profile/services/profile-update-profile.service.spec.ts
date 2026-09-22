// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ProfileUpdateProfileService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ProfileUpdateProfileService.updateProfile -> observable return/delegation.
import { ProfileUpdateProfileService } from '@/backend_manager/modules/manager/profile/services/profile-update-profile.service';

describe('ProfileUpdateProfileService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'profile' } as const;
    const dependency = { updateProfile: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ProfileUpdateProfileService(dependency as never);
    const result = await service.updateProfile({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateProfile as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
