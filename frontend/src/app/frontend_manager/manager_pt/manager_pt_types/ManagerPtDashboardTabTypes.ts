import type { PtDashboardKpis, PtAssignment, PtTrainerWorkload } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';

export interface ManagerPtDashboardTabProps {
  kpis: PtDashboardKpis | null;
  workload: PtTrainerWorkload[];
  expiringPackages: PtAssignment[];
}
