// RESPONSIBILITY: Co-located behavioral unit proof for HrDeleteStaffService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrDeleteStaffService.deleteStaff -> observable return/delegation.
import { HrDeleteStaffService } from '@/modules/manager/hr/services/hr-delete-staff.service.ts';

describe('HrDeleteStaffService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { deleteStaff: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrDeleteStaffService(dependency as never);
    const result = await service.deleteStaff({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteStaff as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
