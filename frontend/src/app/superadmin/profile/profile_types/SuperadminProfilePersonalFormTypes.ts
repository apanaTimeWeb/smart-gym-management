// RESPONSIBILITY: Form value contract for the Superadmin profile personal-details form.
export interface SuperadminProfilePersonalFormValues {
  name: string;
  phone: string;
  timezone?: string;
  language?: string;
}

import type { SuperadminProfileData } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

export interface SuperadminProfilePersonalFormProps {
  profile: SuperadminProfileData;
  isSaving: boolean;
  onSave: (values: SuperadminProfilePersonalFormValues) => void;
}
