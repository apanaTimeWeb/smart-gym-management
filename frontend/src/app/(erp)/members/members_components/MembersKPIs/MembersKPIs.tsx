"use client";

import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useMembersContext } from '@/app/(erp)/members/members_context/MembersContext';

export default function MembersKPIs() {
 const { stats } = useMembersContext();

 const kpis = [
 { label: 'Total Members', value: stats.total, color: 'text-[var(--info)]', bg: 'bg-[var(--info-bg)]', icon: User },
 { label: 'Active', value: stats.active, color: 'text-[var(--success)]', bg: 'bg-[var(--success-bg)]', icon: CheckCircle },
 { label: 'Pending', value: stats.pending, color: 'text-[var(--warning)]', bg: 'bg-[var(--warning-bg)]', icon: Clock },
 { label: 'Expired', value: stats.expired, color: 'text-[var(--danger)]', bg: 'bg-[var(--danger-bg)]', icon: XCircle },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {kpis.map((s, i) => (
 <div key={i} className="bg-[var(--members-bg-card)] rounded-xl p-4 shadow-sm border border-[var(--members-border)] flex items-center gap-3">
 <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
 <s.icon size={19} className={s.color} />
 </div>
 <div>
 <p className="text-xs text-[var(--members-text-secondary)] font-medium">{s.label}</p>
 <p className="text-xl font-bold text-[var(--members-text-primary)]">{s.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
