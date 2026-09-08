// RESPONSIBILITY: TypeScript types for the Superadmin Profile module.

export interface SuperadminProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'SUPERADMIN';
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  createdAt: string;
}

export interface UpdateSuperadminProfilePayload {
  name: string;
  phone: string;
}

export interface UpdateSuperadminPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Toggle2FAPayload {
  enabled: boolean;
  password: string;
}

export type ProfileTab = 'personal' | 'security';
export type ProfileFetchState = 'idle' | 'loading' | 'success' | 'error';
