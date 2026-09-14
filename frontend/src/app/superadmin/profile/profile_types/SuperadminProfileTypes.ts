import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Superadmin Profile module.

export interface SuperadminProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  timezone?: string;
  language?: string;
  role: 'SUPERADMIN';
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  createdAt: string;
}

export interface UpdateSuperadminProfilePayload {
  name: string;
  phone: string;
  timezone?: string;
  language?: string;
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


export const SuperadminProfileDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatarUrl: z.string().optional(),
  lastLogin: z.string(),
  twoFactorEnabled: z.boolean()
});
