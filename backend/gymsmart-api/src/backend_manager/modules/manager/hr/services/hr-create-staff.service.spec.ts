// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrCreateStaffService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrCreateStaffService.createStaff -> observable return/delegation.
import { HrCreateStaffService } from '@/backend_manager/modules/manager/hr/services/hr-create-staff.service';

describe('HrCreateStaffService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { createStaff: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrCreateStaffService(dependency as never);
    const result = await service.createStaff({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createStaff as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
