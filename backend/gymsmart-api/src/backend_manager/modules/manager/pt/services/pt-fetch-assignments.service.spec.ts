// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PtFetchAssignmentsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtFetchAssignmentsService.fetchAssignments -> observable return/delegation.
import { PtFetchAssignmentsService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-assignments.service';

describe('PtFetchAssignmentsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { fetchAssignments: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtFetchAssignmentsService(dependency as never);
    const result = await service.fetchAssignments({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchAssignments as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
