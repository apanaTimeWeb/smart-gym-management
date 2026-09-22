// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for FinanceFetchFinanceSummaryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> FinanceFetchFinanceSummaryService.fetchFinanceSummary -> observable return/delegation.
import { FinanceFetchFinanceSummaryService } from '@/backend_manager/modules/manager/finance/services/finance-fetch-finance-summary.service';

describe('FinanceFetchFinanceSummaryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'finance' } as const;
    const dependency = { fetchFinanceSummary: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new FinanceFetchFinanceSummaryService(dependency as never);
    const result = await service.fetchFinanceSummary({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchFinanceSummary as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
