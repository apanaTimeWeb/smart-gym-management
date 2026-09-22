// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchLedgerService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchLedgerService.fetchLedger -> observable return/delegation.
import { HrFetchLedgerService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-ledger.service';

describe('HrFetchLedgerService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchLedger: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchLedgerService(dependency as never);
    const result = await service.fetchLedger({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchLedger as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
