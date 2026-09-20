// RESPONSIBILITY: Renders a single KPI stat card (icon, label, big number, trend). Used in dashboard and module KPI rows.
import type { ManagerStatCardProps } from '@/app/manager/manager_components/ManagerShared/manager_shared_types/ManagerStatCardTypes';



export default function ManagerStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor }: ManagerStatCardProps) {
 return (
 <div className="bg-card rounded-xl p-5 shadow-card border border-border hover:border-primary motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-secondary uppercase tracking-wider">{title}</p>
 <p className="text-kpi font-bold text-primary mt-1">{value}</p>
 {change && (
 <p className={`text-xs mt-1 font-medium ${
 changeType === 'up' ? 'text-success' :
 changeType === 'down' ? 'text-danger' : 'text-secondary'
 }`}>
 {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
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
