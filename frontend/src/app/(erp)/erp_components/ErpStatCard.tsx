import { LucideIcon } from 'lucide-react';

interface ErpStatCardProps {
 title: string;
 value: string | number;
 change?: string;
 changeType?: 'up' | 'down' | 'neutral';
 icon: LucideIcon;
 iconBg: string;
 iconColor: string;
}

export default function ErpStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor }: ErpStatCardProps) {
 return (
 <div className="bg-[var(--bg-card)] rounded-xl p-5 shadow-sm border border-[var(--border)] hover:border-[var(--border-focus)] transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">{title}</p>
 <p className="text-[28px] font-bold text-[var(--text-primary)] mt-1">{value}</p>
 {change && (
 <p className={`text-xs mt-1 font-medium ${
 changeType === 'up' ? 'text-[var(--success)]' :
 changeType === 'down' ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]'
 }`}>
 {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
 </p>
 )}
 </div>
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ background: iconBg }}>
 <Icon size={22} style={{ color: iconColor }} />
 </div>
 </div>
 </div>
 );
}
