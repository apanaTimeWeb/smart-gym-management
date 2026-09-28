// RESPONSIBILITY: Defines the Trainer profile response domain with frontend-compatible optional fields.
// FLOW: TrainerProfileTrainerProfileEntity → mapper → profile response.

import type { TrainerProfileRole } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-enums';

export interface ProfileTrainerProfileDomain {
  id: string; name: string; email: string; phone: string; role: TrainerProfileRole; specialization: string[]; joinedAt: string; avatarInitial: string;
  certifications?: string[]; specialties?: string[]; bio?: string; experienceYears?: number; profilePhotoUrl?: string; languagesSpoken?: string[];
  commissionRate: number; commissionTier: string; bankAccountMasked?: string;
  emergencyContact?: { name: string; phone: string; relation: string };
}
