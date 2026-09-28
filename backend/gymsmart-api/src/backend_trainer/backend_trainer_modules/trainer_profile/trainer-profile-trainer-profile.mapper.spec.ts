// RESPONSIBILITY: Proves profile nullable persistence values are omitted to match frontend optional fields.
// FLOW: Jest → ProfileTrainerProfileMapper → null profile optionals → frontend-compatible response.

import type { TrainerProfileTrainerProfileEntity } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.entity';
import { ProfileTrainerProfileMapper } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.mapper';
import { TrainerProfileRole } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-enums';

describe('ProfileTrainerProfileMapper', () => {
  it('omits null optional profile fields', () => {
    const entity = {
      id: 'profile-1', name: 'Trainer', email: 'trainer@example.com', phone: '9999999999', role: TrainerProfileRole.TRAINER, specialization: ['Strength'], joinedAt: '2026-01-01', avatarInitial: 'T', certifications: null, specialties: null, emergencyContact: null, bio: null, experienceYears: null, profilePhotoUrl: null, languagesSpoken: null, commissionRate: 10, commissionTier: 'Standard', bankAccountMasked: null,
    } as TrainerProfileTrainerProfileEntity;
    expect(ProfileTrainerProfileMapper(entity)).toEqual({ id: 'profile-1', name: 'Trainer', email: 'trainer@example.com', phone: '9999999999', role: TrainerProfileRole.TRAINER, specialization: ['Strength'], joinedAt: '2026-01-01', avatarInitial: 'T', commissionRate: 10, commissionTier: 'Standard' });
  });
});
