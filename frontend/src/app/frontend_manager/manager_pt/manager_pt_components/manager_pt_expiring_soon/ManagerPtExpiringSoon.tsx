// RESPONSIBILITY: Renders ManagerPtExpiringSoon's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { AlertTriangle, Dumbbell } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ManagerPtExpiringSoonProps } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtExpiringSoonTypes';




/** @description Shows a list of members whose PT packages are nearing completion (< 3 sessions left). @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerPtExpiringSoon({ expiringPackages }: ManagerPtExpiringSoonProps) {
  const t = useTranslations('MANAGER_PT');

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary flex items-center gap-2">
          <AlertTriangle size={18} strokeWidth={2} className="text-warning"/>{t("COPY_EXPIRING_PT_PACKAGES")}</h2>
        <span data-testid="manager_pt-manager-pt-expiring-soon-status-count" className="text-xs font-bold text-warning bg-warning-bg px-2 py-1 rounded-full">
          {expiringPackages.length}{t("COPY_PENDING")}</span>
      </div>

      {expiringPackages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Dumbbell size={18} strokeWidth={2} className="text-secondary opacity-40 mb-3"/>
          <p className="text-sm text-secondary">{t("COPY_ALL_PACKAGES_HEALTHY")}</p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-y-auto">
          {expiringPackages.map((pkg, mapIndex) => {
            const left = pkg.totalSessions - pkg.completedSessions;
            return (
              <div key={pkg.id} className="p-4 hover:bg-input motion-safe:transition-all motion-safe:duration-base ease-in-out">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-primary">{pkg.memberName}</span>
                  <span data-testid={`manager_pt-pt-managerptexpiringsoon-status-left-${mapIndex}`} className="text-xs font-bold text-danger bg-danger-bg px-2 py-0.5 rounded text-nowrap">
                    {left}{t("COPY_LEFT")}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-secondary">
                  <span>{pkg.packageName}</span>
                  <span>{t("COPY_TRAINER_1")}{pkg.trainerName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
