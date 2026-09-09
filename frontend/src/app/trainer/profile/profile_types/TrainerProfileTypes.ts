// RESPONSIBILITY: TypeScript types for the Trainer Profile module.

export interface TrainerProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string[]; // Trainers can have multiple specializations (stored as JSON array in DB)
  joinedAt: string;
  avatarInitial: string;
  certifications?: string[];
  specialties?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  bio?: string;
  experienceYears?: number;
  profilePhotoUrl?: string;
  languagesSpoken?: string[];
}

export interface UpdateTrainerProfilePayload {
  name: string;
  phone: string;
  specialization: string[]; // Array; backend stores as JSON column
}

export interface UpdateTrainerPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type TrainerProfileFetchState = 'idle' | 'loading' | 'success' | 'error';
export type TrainerProfileTab = 'personal' | 'security';
