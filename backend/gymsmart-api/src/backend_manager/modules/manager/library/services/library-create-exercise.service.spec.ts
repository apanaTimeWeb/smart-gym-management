// RESPONSIBILITY: Co-located behavioral unit proof for LibraryCreateExerciseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryCreateExerciseService.createExercise -> observable return/delegation.
import { LibraryCreateExerciseService } from '@/modules/manager/library/services/library-create-exercise.service.ts';

describe('LibraryCreateExerciseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { createExercise: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryCreateExerciseService(dependency as never);
    const result = await service.createExercise({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createExercise as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
