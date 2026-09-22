// RESPONSIBILITY: Co-located behavioral unit proof for WorkoutFetchAssignmentsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> WorkoutFetchAssignmentsService.fetchAssignments -> observable return/delegation.
import { WorkoutFetchAssignmentsService } from '@/modules/manager/workout/services/workout-fetch-assignments.service.ts';

describe('WorkoutFetchAssignmentsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'workout' } as const;
    const dependency = { fetchAssignments: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new WorkoutFetchAssignmentsService(dependency as never);
    const result = await service.fetchAssignments({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchAssignments as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
