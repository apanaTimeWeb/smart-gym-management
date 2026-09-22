// RESPONSIBILITY: Co-located behavioral unit proof for LibraryDeleteExerciseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryDeleteExerciseService.deleteExercise -> observable return/delegation.
import { LibraryDeleteExerciseService } from '@/modules/manager/library/services/library-delete-exercise.service.ts';

describe('LibraryDeleteExerciseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { deleteExercise: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryDeleteExerciseService(dependency as never);
    const result = await service.deleteExercise({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteExercise as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
