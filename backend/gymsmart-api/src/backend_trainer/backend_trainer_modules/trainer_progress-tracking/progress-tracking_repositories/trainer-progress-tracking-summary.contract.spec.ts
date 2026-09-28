// RESPONSIBILITY: Proves progress summaries normalize database numeric values and preserve the entry response contract.
// FLOW: Summary query rows → explicit numeric/null normalization → ProgressTrackingSummary.

import { TrainerProgressTrackingRepository } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_repositories/trainer-progress-tracking-repository';

describe('TrainerProgressTrackingRepository summary contract', () => {
  it('normalizes numeric database values in latest and first entries', async () => {
    const summaryQuery = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { id: 'p2', memberId: 'm1', date: '2026-09-20', weightKg: '74.5', heightCm: '175', bmi: '24.33', bodyFatPercent: '17', muscleMassKg: null, chestCm: null, waistCm: '80', hipCm: null, notes: null, recordedBy: 't1', bloodPressure: null, restingHeartRate: '62', vo2Max: '42.1', progressPhotos: null },
        { id: 'p1', memberId: 'm1', date: '2026-09-10', weightKg: '76.0', heightCm: '175', bmi: '24.82', bodyFatPercent: null, muscleMassKg: '31.2', chestCm: '99', waistCm: '82', hipCm: '101', notes: 'Baseline', recordedBy: 't1', bloodPressure: '120/80', restingHeartRate: null, vo2Max: null, progressPhotos: ['a.webp'] },
      ]),
    };
    const memberQuery = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({ memberName: 'Rahul', targetWeightKg: '73.5' }),
    };
    let count = 0;
    const resolver = { getDataSource: jest.fn().mockResolvedValue({ createQueryBuilder: () => (++count === 1 ? summaryQuery : memberQuery) }) };
    const repo = new TrainerProgressTrackingRepository(resolver as never);

    await expect(repo.findSummary('m1')).resolves.toEqual({
      memberId: 'm1', memberName: 'Rahul', totalEntries: 2,
      latestEntry: { id: 'p2', memberId: 'm1', date: '2026-09-20', weightKg: 74.5, heightCm: 175, bmi: 24.33, bodyFatPercent: 17, muscleMassKg: null, chestCm: null, waistCm: 80, hipCm: null, notes: null, recordedBy: 't1', bloodPressure: null, restingHeartRate: 62, vo2Max: 42.1, progressPhotos: null },
      firstEntry: { id: 'p1', memberId: 'm1', date: '2026-09-10', weightKg: 76, heightCm: 175, bmi: 24.82, bodyFatPercent: null, muscleMassKg: 31.2, chestCm: 99, waistCm: 82, hipCm: 101, notes: 'Baseline', recordedBy: 't1', bloodPressure: '120/80', restingHeartRate: null, vo2Max: null, progressPhotos: ['a.webp'] },
      weightChangeKg: -1.5, bmiChange: -0.49, targetWeightKg: 73.5,
    });
  });
});
