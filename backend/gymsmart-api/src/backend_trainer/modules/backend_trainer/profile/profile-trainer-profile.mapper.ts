// RESPONSIBILITY: Maps profile ORM state into the explicit Trainer profile domain contract.
// FLOW: ProfileTrainerProfileEntity → explicit field mapping → ProfileTrainerProfileDomain.
import type { ProfileTrainerProfileEntity } from '@/backend_trainer/modules/backend_trainer/profile/profile-trainer-profile.entity';
import type { ProfileTrainerProfileDomain } from '@/backend_trainer/modules/backend_trainer/profile/profile-trainer-profile.domain';
export function ProfileTrainerProfileMapper(entity: ProfileTrainerProfileEntity): ProfileTrainerProfileDomain {
  return { id:entity.id,name:entity.name,email:entity.email,phone:entity.phone,role:entity.role,specialization:entity.specialization,joinedAt:entity.joinedAt,avatarInitial:entity.avatarInitial,certifications:entity.certifications,specialties:entity.specialties,bio:entity.bio,experienceYears:entity.experienceYears,profilePhotoUrl:entity.profilePhotoUrl,languagesSpoken:entity.languagesSpoken,commissionRate:Number(entity.commissionRate),commissionTier:entity.commissionTier,bankAccountMasked:entity.bankAccountMasked };
}
