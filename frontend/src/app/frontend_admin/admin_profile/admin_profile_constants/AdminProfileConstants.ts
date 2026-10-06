// RESPONSIBILITY: Canonical constants discovery entry for the AdminProfile feature.

/** Stable feature-local constants entry point; populated as documented static configuration is introduced. */
export const PROFILE_CONSTANTS = {} as const;


import type { UpdateAdminPasswordPayload, UpdateAdminProfilePayload } from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileTypes';

/** Stable empty values for the two profile forms; no business fallback data is introduced. */
export const ADMIN_PROFILE_EMPTY_FORM: UpdateAdminProfilePayload = { name: '', phone: '' };
export const ADMIN_PASSWORD_EMPTY_FORM: UpdateAdminPasswordPayload = { currentPassword: '', newPassword: '', confirmPassword: '' };
