// RESPONSIBILITY: Renders ManagerMembersKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { MANAGER_MEMBERS_KPI_CONFIG } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersKpiConstants';
import { useFetchMemberStats } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';




/** @description Renders the four KPI stat cards (Total, Active, Pending, Expired) for the Members module. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersKPIs() {
  const { data: stats } = useFetchMemberStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {MANAGER_MEMBERS_KPI_CONFIG.map(s => (
        <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
            <s.icon size={18} className={s.color} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{s.label}</p>
            <p className="text-xl font-bold text-primary">{stats?.[s.key] ?? 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
