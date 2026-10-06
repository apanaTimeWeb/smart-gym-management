import type { PtActiveTab } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';

export interface ManagerPtTabBarProps {
  tabs: readonly PtActiveTab[];
  activeTab: PtActiveTab;
  onChange: (id: PtActiveTab) => void;
}
