import type { FeatureFlag } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

export interface SuperadminFeatureRolloutModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: FeatureFlag | null;
  onSaveRollout: (tenantIds: string[]) => Promise<void>;
}
