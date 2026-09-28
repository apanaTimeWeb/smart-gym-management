// RESPONSIBILITY: Proves isolated behavior for the adjacent backend_trainer unit under test.
// FLOW: Jest test → mocked feature dependencies → observable service behavior.

import { IsNull } from 'typeorm';
// RESPONSIBILITY: Proves profile read success and fail-fast missing-profile behavior.
// FLOW: Unit test → TrainerProfileTrainerProfileReadService → repository fake.

import { TrainerProfileTrainerProfileReadService } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_services/trainer-profile-trainer-profile-read.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';

describe('TrainerProfileTrainerProfileReadService', () => {
  it('returns the mapped authenticated profile', async () => {
    const repo = { findByUserId: jest.fn().mockResolvedValue({ id: '1', userId: 'u1', name: 'Trainer', email: 't@example.com', phone: '9000000000', role: 'TRAINER', specialization: [], joinedAt: new Date('2024-01-01'), avatarInitial: 'T', certifications: null, specialties: null, bio: null, experienceYears: null, profilePhotoUrl: null, languagesSpoken: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: IsNull() }) };
    const service = new TrainerProfileTrainerProfileReadService(repo as never);
    const result = await CoreRequestContext.run({ requestId: 'test-request', userId: 'u1' }, () => service.find());
    expect(result.name).toBe('Trainer');
    expect(repo.findByUserId).toHaveBeenCalled();
  });

  it('fails when the trainer profile is missing', async () => {
    const service = new TrainerProfileTrainerProfileReadService({ findByUserId: jest.fn().mockResolvedValue(null) } as never);
    await expect(CoreRequestContext.run({ requestId: 'test-request', userId: 'u1' }, () => service.find())).rejects.toThrow('DOMAIN.PROFILE.TRAINER_PROFILE.NOT_FOUND');
  });
});
