// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PtCreateAssignmentService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtCreateAssignmentService.createAssignment -> observable return/delegation.
import { PtCreateAssignmentService } from '@/backend_manager/modules/manager/pt/services/pt-create-assignment.service';

describe('PtCreateAssignmentService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { createAssignment: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtCreateAssignmentService(dependency as never);
    const result = await service.createAssignment({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.createAssignment as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
