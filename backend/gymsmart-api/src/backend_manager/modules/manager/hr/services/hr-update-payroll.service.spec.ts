// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrUpdatePayrollService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrUpdatePayrollService.updatePayroll -> observable return/delegation.
import { HrUpdatePayrollService } from '@/backend_manager/modules/manager/hr/services/hr-update-payroll.service';

describe('HrUpdatePayrollService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { updatePayroll: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrUpdatePayrollService(dependency as never);
    const result = await service.updatePayroll({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updatePayroll as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
