// RESPONSIBILITY: TypeScript types for the Manager Profile module.

export interface ManagerProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branchName: string;
  joinedAt: string;
  avatarInitial: string;
}

export interface UpdateManagerProfilePayload {
  name: string;
  phone: string;
}

export interface UpdateManagerPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ManagerProfileFetchState = 'idle' | 'loading' | 'success' | 'error';
export type ManagerProfileTab = 'personal' | 'security';
