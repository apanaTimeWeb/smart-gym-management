// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrCreatePayrollService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrCreatePayrollService.createPayroll -> observable return/delegation.
import { HrCreatePayrollService } from '@/backend_manager/modules/manager/hr/services/hr-create-payroll.service';

describe('HrCreatePayrollService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { createPayroll: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrCreatePayrollService(dependency as never);
    const result = await service.createPayroll({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createPayroll as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
