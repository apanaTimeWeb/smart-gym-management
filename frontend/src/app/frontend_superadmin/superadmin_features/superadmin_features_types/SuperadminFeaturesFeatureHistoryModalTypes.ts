// RESPONSIBILITY: Defines the prop contract for SuperadminFeaturesFeatureHistoryModal.
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
export interface SuperadminFeatureHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: FeatureFlag | null;
}
