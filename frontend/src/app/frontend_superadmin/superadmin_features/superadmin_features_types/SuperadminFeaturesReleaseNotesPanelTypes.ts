import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import type { ReleaseNote } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { ReleaseNoteFormValues } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesUiTypes';

export interface SuperadminFeaturesReleaseNotesPanelProps {
  notes: ReleaseNote[];
  isPublishing: boolean;
  register: UseFormRegister<ReleaseNoteFormValues>;
  handleSubmit: UseFormHandleSubmit<ReleaseNoteFormValues>;
  errors: FieldErrors<ReleaseNoteFormValues>;
  onPublishNote: (formData: ReleaseNoteFormValues) => Promise<void>;
}
