// RESPONSIBILITY: Maps profile persistence into the exact Trainer frontend profile response semantics.
// FLOW: TrainerProfileTrainerProfileEntity → nullable-field normalization → ProfileTrainerProfileDomain.

import type { TrainerProfileTrainerProfileEntity } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.entity';
import type { ProfileTrainerProfileDomain } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.domain';

/**
 * Maps a persisted Trainer profile row into the frontend profile contract.
 * @param entity Persisted Trainer profile.
 * @returns Frontend-compatible profile data with null optional fields omitted.
 */
/**
 * @description Executes ProfileTrainerProfileMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for ProfileTrainerProfileMapper.
 * @returns {ProfileTrainerProfileDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function ProfileTrainerProfileMapper(entity: TrainerProfileTrainerProfileEntity): ProfileTrainerProfileDomain {
  return {
    id: entity.id, name: entity.name, email: entity.email, phone: entity.phone, role: entity.role, specialization: entity.specialization, joinedAt: entity.joinedAt, avatarInitial: entity.avatarInitial,
    commissionRate: Number(entity.commissionRate), commissionTier: entity.commissionTier,
    ...(entity.certifications ? { certifications: entity.certifications } : {}),
    ...(entity.specialties ? { specialties: entity.specialties } : {}),
    ...(entity.bio !== null ? { bio: entity.bio } : {}),
    ...(entity.experienceYears !== null ? { experienceYears: Number(entity.experienceYears) } : {}),
    ...(entity.profilePhotoUrl !== null ? { profilePhotoUrl: entity.profilePhotoUrl } : {}),
    ...(entity.languagesSpoken ? { languagesSpoken: entity.languagesSpoken } : {}),
    ...(entity.bankAccountMasked !== null ? { bankAccountMasked: entity.bankAccountMasked } : {}),
    ...(entity.emergencyContact ? { emergencyContact: { name: entity.emergencyContact.name ?? '', phone: entity.emergencyContact.phone ?? '', relation: entity.emergencyContact.relation ?? '' } } : {}),
  };
}
