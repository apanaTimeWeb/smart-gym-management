// RESPONSIBILITY: Form value contract for the Superadmin password-security form.
export interface SuperadminProfileSecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

import type { SuperadminProfileData, Toggle2FAPayload } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';

export interface SuperadminProfileSecurityFormProps {
  profile: SuperadminProfileData;
  isSavingPassword: boolean;
  isTogglingTwoFA: boolean;
  onSavePassword: (values: SuperadminProfileSecurityFormValues) => void;
  onToggle2FA: (payload: Toggle2FAPayload) => void;
}
