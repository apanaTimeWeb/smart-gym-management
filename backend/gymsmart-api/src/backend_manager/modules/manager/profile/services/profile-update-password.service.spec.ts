// RESPONSIBILITY: Co-located behavioral unit proof for ProfileUpdatePasswordService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ProfileUpdatePasswordService.updatePassword -> observable return/delegation.
import { ProfileUpdatePasswordService } from '@/modules/manager/profile/services/profile-update-password.service.ts';

describe('ProfileUpdatePasswordService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'profile' } as const;
    const dependency = { updatePassword: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ProfileUpdatePasswordService(dependency as never);
    const result = await service.updatePassword({} as never);
    expect(result).toEqual(expected);
    expect((dependency.updatePassword as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
