// RESPONSIBILITY: TypeScript types for the Trainer Profile module.

export interface TrainerProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
  joinedAt: string;
  avatarInitial: string;
}

export interface UpdateTrainerProfilePayload {
  name: string;
  phone: string;
  specialization: string;
}

export interface UpdateTrainerPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type TrainerProfileFetchState = 'idle' | 'loading' | 'success' | 'error';
export type TrainerProfileTab = 'personal' | 'security';
