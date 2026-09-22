// RESPONSIBILITY: Co-located behavioral unit proof for PlansCreateChangeRequestService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PlansCreateChangeRequestService.createChangeRequest -> observable return/delegation.
import { PlansCreateChangeRequestService } from '@/modules/manager/plans/services/plans-create-change-request.service.ts';

describe('PlansCreateChangeRequestService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'plans' } as const;
    const dependency = { createChangeRequest: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PlansCreateChangeRequestService(dependency as never);
    const result = await service.createChangeRequest({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createChangeRequest as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
