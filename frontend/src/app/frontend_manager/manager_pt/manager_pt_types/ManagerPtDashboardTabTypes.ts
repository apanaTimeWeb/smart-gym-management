import type { ManagerPtKpis, ManagerPtPackage, ManagerPtTrainerWorkload } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';

export interface ManagerPtDashboardTabProps {
  kpis: ManagerPtKpis;
  workload: ManagerPtTrainerWorkload[];
  expiringPackages: ManagerPtPackage[];
}
