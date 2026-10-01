import { SUPERADMIN_PROFILE_DATA_EXPORT_COMPLETION_STATES } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileConstants';

// RESPONSIBILITY: Data export/offboarding view and mutation contracts for the Superadmin Profile settings surface.
export type SuperadminProfileDataExportCompletionState = (typeof SUPERADMIN_PROFILE_DATA_EXPORT_COMPLETION_STATES)[number];

export interface SuperadminDataExportCardProps {
  onRequestExport: () => Promise<void>;
  isRequesting: boolean;
  completionState: SuperadminProfileDataExportCompletionState;
}
