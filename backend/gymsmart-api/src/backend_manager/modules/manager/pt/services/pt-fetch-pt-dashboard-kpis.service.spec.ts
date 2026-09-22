// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PtFetchPtDashboardKpisService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtFetchPtDashboardKpisService.fetchPtDashboardKpis -> observable return/delegation.
import { PtFetchPtDashboardKpisService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-pt-dashboard-kpis.service';

describe('PtFetchPtDashboardKpisService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { fetchPtDashboardKpis: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtFetchPtDashboardKpisService(dependency as never);
    const result = await service.fetchPtDashboardKpis({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPtDashboardKpis as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
