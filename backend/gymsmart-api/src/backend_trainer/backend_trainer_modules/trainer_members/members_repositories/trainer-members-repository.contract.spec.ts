// RESPONSIBILITY: Proves Members supporting-read SQL payloads are normalized to frontend contract shapes.
// FLOW: Repository query results → response normalization → member attendance/diet/progress contracts.

import { TrainerMembersReadRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-read.repository';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';

describe('TrainerMembersRepository supporting contracts', () => {
  it('maps current-month attendance rows to day/status records', async () => {
    const query = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { date: '2026-09-02', checkIn: '2026-09-02T08:00:00.000Z' },
        { date: '2026-09-02', checkIn: '2026-09-02T09:00:00.000Z' },
        { date: '2026-09-04', checkIn: null },
      ]),
    };
    const resolver = { getDataSource: jest.fn().mockResolvedValue({ createQueryBuilder: () => query }) };
    const repo = new TrainerMembersRepository(resolver as never, new TrainerMembersReadRepository(resolver as never));

    await expect(repo.findAttendance('member-1')).resolves.toEqual([
      { day: 2, status: 'P' },
    ]);
  });

  it('normalizes PostgreSQL numeric diet fields to numbers', async () => {
    const query = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { id: 'diet-1', name: 'Cut', goal: 'WEIGHT_LOSS', calories: '1800', protein: '140', carbs: '160', fats: '55', description: null, meals: [] },
      ]),
    };
    const resolver = { getDataSource: jest.fn().mockResolvedValue({ createQueryBuilder: () => query }) };
    const repo = new TrainerMembersRepository(resolver as never, new TrainerMembersReadRepository(resolver as never));

    await expect(repo.findDietPlans()).resolves.toEqual([{
      id: 'diet-1', name: 'Cut', goal: 'WEIGHT_LOSS', calories: 1800, protein: 140, carbs: 160, fats: 55, meals: [],
    }]);
  });

  it('normalizes PostgreSQL numeric progress fields to numbers', async () => {
    const query = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { id: 'progress-1', memberId: 'member-1', date: '2026-09-10', weightKg: '75.5', heightCm: '175', bmi: '24.65', bodyFatPercent: '18', muscleMassKg: null, chestCm: '98', waistCm: null, hipCm: '100', recordedBy: 'trainer-1', progressPhotos: null },
      ]),
    };
    const resolver = { getDataSource: jest.fn().mockResolvedValue({ createQueryBuilder: () => query }) };
    const repo = new TrainerMembersRepository(resolver as never, new TrainerMembersReadRepository(resolver as never));

    await expect(repo.findProgress('member-1')).resolves.toEqual([{
      id: 'progress-1', memberId: 'member-1', date: '2026-09-10', weightKg: 75.5, heightCm: 175, bmi: 24.65, bodyFatPercent: 18, chestCm: 98, recordedBy: 'trainer-1',
    }]);
  });
});
