// RESPONSIBILITY: Co-located behavioral unit proof for HrUpdatePayrollStatusService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrUpdatePayrollStatusService.updatePayrollStatus -> observable return/delegation.
import { HrUpdatePayrollStatusService } from '@/modules/manager/hr/services/hr-update-payroll-status.service.ts';

describe('HrUpdatePayrollStatusService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { updatePayrollStatus: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrUpdatePayrollStatusService(dependency as never);
    const result = await service.updatePayrollStatus({} as never);
    expect(result).toEqual(expected);
    expect((dependency.updatePayrollStatus as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
