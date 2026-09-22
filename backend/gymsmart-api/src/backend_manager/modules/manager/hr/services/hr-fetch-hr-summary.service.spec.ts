// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchHrSummaryService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchHrSummaryService.fetchHrSummary -> observable return/delegation.
import { HrFetchHrSummaryService } from '@/modules/manager/hr/services/hr-fetch-hr-summary.service.ts';

describe('HrFetchHrSummaryService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchHrSummary: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchHrSummaryService(dependency as never);
    const result = await service.fetchHrSummary({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchHrSummary as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
