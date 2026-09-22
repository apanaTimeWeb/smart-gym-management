// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrUpdateStaffService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrUpdateStaffService.updateStaff -> observable return/delegation.
import { HrUpdateStaffService } from '@/backend_manager/modules/manager/hr/services/hr-update-staff.service';

describe('HrUpdateStaffService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { updateStaff: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrUpdateStaffService(dependency as never);
    const result = await service.updateStaff({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateStaff as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
