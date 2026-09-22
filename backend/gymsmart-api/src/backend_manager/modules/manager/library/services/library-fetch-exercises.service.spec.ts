// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for LibraryFetchExercisesService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> LibraryFetchExercisesService.fetchExercises -> observable return/delegation.
import { LibraryFetchExercisesService } from '@/backend_manager/modules/manager/library/services/library-fetch-exercises.service';

describe('LibraryFetchExercisesService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'library' } as const;
    const dependency = { fetchExercises: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new LibraryFetchExercisesService(dependency as never);
    const result = await service.fetchExercises({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchExercises as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
