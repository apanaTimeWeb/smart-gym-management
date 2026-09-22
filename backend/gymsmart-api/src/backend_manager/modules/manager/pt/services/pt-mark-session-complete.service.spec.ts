// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PtMarkSessionCompleteService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtMarkSessionCompleteService.markSessionComplete -> observable return/delegation.
import { PtMarkSessionCompleteService } from '@/backend_manager/modules/manager/pt/services/pt-mark-session-complete.service';

describe('PtMarkSessionCompleteService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { markSessionComplete: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtMarkSessionCompleteService(dependency as never);
    const result = await service.markSessionComplete({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.markSessionComplete as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
