// RESPONSIBILITY: Proves member progress raw-query rows preserve extended UI measurement fields.
// FLOW: Mock tenant query builder → findProgress() → normalized domain rows → assert notes/health metrics.

import { TrainerMembersReadRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-read.repository';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';

describe('TrainerMembersRepository progress provenance', () => {
  it('returns extended progress fields when the database supplies them', async () => {
    const rows = [{ id: 'p1', memberId: 'm1', date: '2026-09-24', weightKg: '80.2', heightCm: '175', bmi: '26.2', bodyFatPercent: null, muscleMassKg: null, chestCm: null, waistCm: null, hipCm: null, notes: 'Stable', bloodPressure: '120/80', restingHeartRate: '58', vo2Max: '44', recordedBy: 't1', progressPhotos: null }];
    const qb = { select: jest.fn().mockReturnThis(), from: jest.fn().mockReturnThis(), where: jest.fn().mockReturnThis(), orderBy: jest.fn().mockReturnThis(), limit: jest.fn().mockReturnThis(), getRawMany: jest.fn().mockResolvedValue(rows) };
    const resolver = { getDataSource: jest.fn().mockResolvedValue({ createQueryBuilder: jest.fn().mockReturnValue(qb) }) } as never;
    const repository = new TrainerMembersRepository(resolver, new TrainerMembersReadRepository(resolver as never));
    const result = await repository.findProgress('m1');
    expect(result[0]).toMatchObject({ notes: 'Stable', bloodPressure: '120/80', restingHeartRate: 58, vo2Max: 44, weightKg: 80.2 });
  });
});
