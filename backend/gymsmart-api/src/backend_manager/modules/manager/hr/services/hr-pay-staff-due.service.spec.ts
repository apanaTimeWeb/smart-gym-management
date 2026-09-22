// RESPONSIBILITY: Co-located behavioral unit proof for HrPayStaffDueService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrPayStaffDueService.payStaffDue -> observable return/delegation.
import { HrPayStaffDueService } from '@/modules/manager/hr/services/hr-pay-staff-due.service.ts';

describe('HrPayStaffDueService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { payStaffDue: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrPayStaffDueService(dependency as never);
    const result = await service.payStaffDue({} as never);
    expect(result).toEqual(expected);
    expect((dependency.payStaffDue as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
