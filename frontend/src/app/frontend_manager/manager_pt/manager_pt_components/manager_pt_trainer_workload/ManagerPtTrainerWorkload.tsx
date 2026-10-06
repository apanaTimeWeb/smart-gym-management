// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Users, Star, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerPtTrainerWorkloadEmptyState from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_trainer_workload_empty_state/ManagerPtTrainerWorkloadEmptyState';
import { MANAGER_PT_STATUS_VALUES } from '@/app/frontend_manager/manager_pt/manager_pt_constants/ManagerPtConstants';
import type { ManagerPtTrainerWorkloadProps } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTrainerWorkloadTypes';


/**
 * @description Renders/orchestrates the ManagerPtTrainerWorkload user interface for the pt module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_trainer_workload_empty_state/ManagerPtTrainerWorkloadEmptyState; @/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTrainerWorkloadTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const PT_TRAINER_WORKLOAD_COLUMN_COUNT = 4;



/** @description Renders the ManagerPtTrainerWorkload component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerPtTrainerWorkload({ workload }: ManagerPtTrainerWorkloadProps) {
  const t = useTranslations('MANAGER_PT');

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-primary">{t("COPY_TRAINER_WORKLOAD")}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t("COPY_TRAINER_4")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t("COPY_CLIENTS")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t("COPY_RATING")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">{t("COPY_STATUS")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(() => { if (workload.length === 0) { return (
              <tr>
                <td colSpan={PT_TRAINER_WORKLOAD_COLUMN_COUNT}>
                  <ManagerPtTrainerWorkloadEmptyState />
                </td>
              </tr>
            ); } return (
              workload.map((trainer) => (
                <tr key={trainer.trainerId} className="hover:bg-input motion-safe:transition-all motion-safe:duration-base ease-in-out">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-input flex items-center justify-center">
                        <User size={18} strokeWidth={2} className="text-secondary"/>
                      </div>
                      <span className="text-sm font-medium text-primary">{trainer.trainerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-primary font-semibold">
                      <Users size={18} strokeWidth={2} className="text-secondary"/>
                      {trainer.activeClients}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <Star size={18} strokeWidth={2} className="text-warning fill-warning"/>
                      {trainer.rating}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      trainer.status === MANAGER_PT_STATUS_VALUES.FULLY_BOOKED 
                        ? 'bg-danger-bg text-danger' 
                        : 'bg-success-bg text-success'
                    }`} data-testid="manager_pt-managerpttrainerworkload-status-badge-1">
                      {trainer.status}
                    </span>
                  </td>
                </tr>
              ))
            ); })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
