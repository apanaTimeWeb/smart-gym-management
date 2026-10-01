import type { FeaturesTab } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesUiTypes';

export interface SuperadminFeaturesHeaderProps {
  activeTab: FeaturesTab;
  onTabChange: (tab: FeaturesTab) => void;
}
