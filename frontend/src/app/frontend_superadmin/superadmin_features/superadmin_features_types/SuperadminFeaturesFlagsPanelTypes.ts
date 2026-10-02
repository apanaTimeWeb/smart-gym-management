import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';

export interface SuperadminFeaturesFlagsPanelProps {
  flags: FeatureFlag[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onManageRollout: (flag: FeatureFlag) => void;
  onViewHistory: (flag: FeatureFlag) => void;
  onToggle: (flag: FeatureFlag) => Promise<void>;
}
