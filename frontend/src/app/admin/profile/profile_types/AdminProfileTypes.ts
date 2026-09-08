// RESPONSIBILITY: TypeScript types for the Admin Profile module.

export interface AdminProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branchName: string;
  joinedAt: string;
  avatarInitial: string;
}

export interface UpdateAdminProfilePayload {
  name: string;
  phone: string;
}

export interface UpdateAdminPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ProfileFetchState = 'idle' | 'loading' | 'success' | 'error';
export type ProfileTab = 'personal' | 'security';
