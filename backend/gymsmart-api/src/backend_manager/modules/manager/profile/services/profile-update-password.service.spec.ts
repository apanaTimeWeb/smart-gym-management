// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ProfileUpdatePasswordService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ProfileUpdatePasswordService.updatePassword -> observable return/delegation.
import { ProfileUpdatePasswordService } from '@/backend_manager/modules/manager/profile/services/profile-update-password.service';

describe('ProfileUpdatePasswordService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'profile' } as const;
    const dependency = { updatePassword: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ProfileUpdatePasswordService(dependency as never);
    const result = await service.updatePassword({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updatePassword as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
