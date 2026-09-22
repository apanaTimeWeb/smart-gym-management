// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchPayrollsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchPayrollsService.fetchPayrolls -> observable return/delegation.
import { HrFetchPayrollsService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-payrolls.service';

describe('HrFetchPayrollsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchPayrolls: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchPayrollsService(dependency as never);
    const result = await service.fetchPayrolls({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPayrolls as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
