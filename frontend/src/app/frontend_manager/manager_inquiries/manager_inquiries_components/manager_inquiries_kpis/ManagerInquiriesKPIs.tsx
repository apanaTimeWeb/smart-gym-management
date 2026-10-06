// RESPONSIBILITY: Renders ManagerInquiriesKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { MANAGER_INQUIRIES_KPI_CONFIG } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesKpiConstants';
import { useManagerInquiriesLogic } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic';
import { ManagerInquiriesFormatNumber } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_utils/ManagerInquiriesFormatters';


/** @description Renders the ManagerInquiriesKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerInquiriesKPIs() {
  const { stats, isPending } = useManagerInquiriesLogic();

  if (isPending && !stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((skeletonCard) => (
          <div key={`skeleton-card-${skeletonCard}`} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-input" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-input rounded" />
              <div className="h-5 w-10 bg-input rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {MANAGER_INQUIRIES_KPI_CONFIG.map((item) => (
        <div key={item.key} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
            <item.icon size={18} className={item.color} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{item.label}</p>
            <p className="text-kpi font-bold text-primary">{ManagerInquiriesFormatNumber(stats[item.key])}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
