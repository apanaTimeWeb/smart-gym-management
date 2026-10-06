// RESPONSIBILITY: Renders ManagerStatCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import type { ManagerStatCardProps } from '@/components/ui/manager_stat_card/ManagerStatCardTypes';



/** @description Renders a single KPI stat card (icon, label, big number, trend). Used in dashboard and module KPI rows. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor }: ManagerStatCardProps) {
 return (
 <div className="bg-card rounded-xl p-5 shadow-card border border-border hover:border-primary motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-secondary uppercase tracking-wider">{title}</p>
 <p className="text-kpi font-bold text-primary mt-1">{value}</p>
 {change && (
 <p className={`text-xs mt-1 font-medium ${
 (() => { if (changeType === 'up') return 'text-success'; return (() => { if (changeType === 'down') return 'text-danger'; return 'text-secondary'; })(); })()
 }`}>
 {(() => { if (changeType === 'up') return '↑'; return (() => { if (changeType === 'down') return '↓'; return ''; })(); })()} {change}
 </p>
 )}
 </div>
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
 <Icon size={18} className={iconColor} />
 </div>
 </div>
 </div>
 );
}
