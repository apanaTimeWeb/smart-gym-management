// RESPONSIBILITY: Defines domain/data transfer shapes for the profile feature without ORM leakage.
// FLOW: DTO -> ProfileInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface ProfileListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface ProfileCreateInput {
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
export interface ProfileUpdateInput extends ProfileCreateInput {}

export interface ProfileDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
