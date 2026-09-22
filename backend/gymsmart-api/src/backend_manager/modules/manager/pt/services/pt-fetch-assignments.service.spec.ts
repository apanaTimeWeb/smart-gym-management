// RESPONSIBILITY: Co-located behavioral unit proof for PtFetchAssignmentsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtFetchAssignmentsService.fetchAssignments -> observable return/delegation.
import { PtFetchAssignmentsService } from '@/modules/manager/pt/services/pt-fetch-assignments.service.ts';

describe('PtFetchAssignmentsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { fetchAssignments: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtFetchAssignmentsService(dependency as never);
    const result = await service.fetchAssignments({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchAssignments as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
