// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for LibraryUpdateExerciseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryUpdateExerciseService.updateExercise -> observable return/delegation.
import { LibraryUpdateExerciseService } from '@/backend_manager/modules/manager/library/services/library-update-exercise.service';

describe('LibraryUpdateExerciseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { updateExercise: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryUpdateExerciseService(dependency as never);
    const result = await service.updateExercise({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateExercise as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
