// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import ManagerPtExpiringSoon from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_expiring_soon/ManagerPtExpiringSoon';
import ManagerPtKPIs from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_kpis/ManagerPtKPIs';
import ManagerPtTrainerWorkload from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_trainer_workload/ManagerPtTrainerWorkload';
import type { ManagerPtDashboardTabProps } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtDashboardTabTypes';

/**
 * @description Composes the PT dashboard KPI, trainer workload, and expiring-package sections.
 * @dependencies Delegates each visual section to its existing Manager PT child component.
 * @edge-case Renders supplied empty arrays safely while preserving section layout.
 */
export default function ManagerPtDashboardTab({ kpis, workload, expiringPackages }: ManagerPtDashboardTabProps) {
  return (
    <div className="space-y-6">
      <ManagerPtKPIs kpis={kpis} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><ManagerPtTrainerWorkload workload={workload} /></div>
        <div><ManagerPtExpiringSoon expiringPackages={expiringPackages} /></div>
      </div>
    </div>
  );
}
