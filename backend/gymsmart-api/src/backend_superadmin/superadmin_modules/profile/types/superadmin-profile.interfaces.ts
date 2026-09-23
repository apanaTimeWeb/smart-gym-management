// RESPONSIBILITY: Defines domain/data transfer shapes for the profile feature without ORM leakage.
// FLOW: DTO -> ProfileInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminProfileListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminProfileCreateInput {
  name?: string;
  email?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  role?: string;
  avatarUrl?: string;
  lastLoginAt?: Date | null;
  twoFactorEnabled?: boolean;
  passwordHash?: string;
}
export interface SuperadminProfileUpdateInput extends SuperadminProfileCreateInput {}

export interface SuperadminProfileDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  role: string;
  avatarUrl: string;
  lastLoginAt: Date | null;
  twoFactorEnabled: boolean;
  passwordHash: string;
}
