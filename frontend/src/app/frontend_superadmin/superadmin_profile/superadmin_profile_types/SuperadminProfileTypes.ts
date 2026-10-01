import { SuperadminProfileDataSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileTypesSchemas';
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
import { SUPERADMIN_PROFILE_TABS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileConstants';

export type ProfileTab = typeof SUPERADMIN_PROFILE_TABS[number];
