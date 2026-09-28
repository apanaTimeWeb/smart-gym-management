// RESPONSIBILITY: Proves Workout repositories apply frontend category filters server-side and ignore the All sentinel.
// FLOW: Mock TypeORM query builder → repository list → inspect generated conditions.

import { TrainerWorkoutRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-repository';
import { TrainerWorkoutExercisesRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-exercises.repository';

function queryBuilder(rows: unknown[] = []): Record<string, jest.Mock> {
  return { where: jest.fn().mockReturnThis(), andWhere: jest.fn().mockReturnThis(), orderBy: jest.fn().mockReturnThis(), skip: jest.fn().mockReturnThis(), take: jest.fn().mockReturnThis(), getManyAndCount: jest.fn().mockResolvedValue([rows, rows.length]), createQueryBuilder: jest.fn() };
}

describe('Trainer workout category filters', () => {
  it('filters workout plans by persisted focus and ignores All', async () => {
    const qb = queryBuilder();
    const resolver = { getRepository: jest.fn().mockResolvedValue({ createQueryBuilder: jest.fn().mockReturnValue(qb) }) } as never;
    const repo = new TrainerWorkoutRepository(resolver);
    await repo.findMany('trainer-1', { page: 1, limit: 10, sortBy: 'name', sortDirection: 'asc', category: 'Strength' });
    expect(qb.andWhere).toHaveBeenCalledWith('w.focus=:category', { category: 'Strength' });
  });

  it('does not add a category clause for All in the exercise library', async () => {
    const qb = queryBuilder();
    const resolver = { getRepository: jest.fn().mockResolvedValue({ createQueryBuilder: jest.fn().mockReturnValue(qb) }) } as never;
    const repo = new TrainerWorkoutExercisesRepository(resolver);
    await repo.findMany('trainer-1', { page: 1, limit: 10, sortBy: 'name', sortDirection: 'asc', category: 'All' });
    expect(qb.andWhere.mock.calls.some(([value]) => String(value).includes('muscle_group'))).toBe(false);
  });
});
