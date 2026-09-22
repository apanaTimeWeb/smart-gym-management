// RESPONSIBILITY: Defines the profile business object independent from TypeORM persistence.
// FLOW: profile repository → mapper → domain object → service.

import type { TrainerProfileRole } from '@/backend_trainer/modules/backend_trainer/profile/profile-enums';

export interface ProfileTrainerProfileDomain {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TrainerProfileRole;
  specialization: string[];
  joinedAt: string;
  avatarInitial: string;
  certifications: string[] | null;
  specialties: string[] | null;
  bio: string | null;
  experienceYears: number | null;
  profilePhotoUrl: string | null;
  languagesSpoken: string[] | null;
  commissionRate: number;
  commissionTier: string;
  bankAccountMasked: string | null;
}
