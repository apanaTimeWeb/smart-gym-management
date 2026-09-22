// RESPONSIBILITY: Co-located behavioral unit proof for LibraryFetchExercisesService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryFetchExercisesService.fetchExercises -> observable return/delegation.
import { LibraryFetchExercisesService } from '@/modules/manager/library/services/library-fetch-exercises.service.ts';

describe('LibraryFetchExercisesService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { fetchExercises: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryFetchExercisesService(dependency as never);
    const result = await service.fetchExercises({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchExercises as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
