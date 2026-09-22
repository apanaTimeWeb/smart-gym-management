// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrGiveStaffAdvanceService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrGiveStaffAdvanceService.giveStaffAdvance -> observable return/delegation.
import { HrGiveStaffAdvanceService } from '@/backend_manager/modules/manager/hr/services/hr-give-staff-advance.service';

describe('HrGiveStaffAdvanceService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { giveStaffAdvance: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrGiveStaffAdvanceService(dependency as never);
    const result = await service.giveStaffAdvance({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.giveStaffAdvance as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
