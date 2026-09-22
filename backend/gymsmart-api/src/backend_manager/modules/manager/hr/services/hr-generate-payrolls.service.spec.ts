// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrGeneratePayrollsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrGeneratePayrollsService.generatePayrolls -> observable return/delegation.
import { HrGeneratePayrollsService } from '@/backend_manager/modules/manager/hr/services/hr-generate-payrolls.service';

describe('HrGeneratePayrollsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { generatePayrolls: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrGeneratePayrollsService(dependency as never);
    const result = await service.generatePayrolls({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.generatePayrolls as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
