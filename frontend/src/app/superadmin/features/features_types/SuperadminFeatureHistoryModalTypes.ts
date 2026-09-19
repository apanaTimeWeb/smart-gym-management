// RESPONSIBILITY: Defines the prop contract for SuperadminFeatureHistoryModal.
import type { FeatureFlag } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
export interface SuperadminFeatureHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: FeatureFlag | null;
}
