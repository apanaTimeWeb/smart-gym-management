// RESPONSIBILITY: Renders key performance indicators for the members module.
"use client";

import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useMembersContext } from '@/app/erp/members/members_context/MembersContext';

export default function MembersKPIs() {
 const { stats } = useMembersContext();

 const kpis = [
 { label: 'Total Members', value: stats.total, color: 'text-info', bg: 'bg-info-bg', icon: User },
 { label: 'Active', value: stats.active, color: 'text-success', bg: 'bg-success-bg', icon: CheckCircle },
 { label: 'Pending', value: stats.pending, color: 'text-warning', bg: 'bg-warning-bg', icon: Clock },
 { label: 'Expired', value: stats.expired, color: 'text-destructive', bg: 'bg-danger-bg', icon: XCircle },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {kpis.map((s, i) => (
 <div key={i} className="bg-card rounded-xl p-4 shadow-sm border border-border flex items-center gap-3">
 <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
 <s.icon size={19} className={s.color} />
 </div>
 <div>
 <p className="text-xs text-secondary font-medium">{s.label}</p>
 <p className="text-xl font-bold text-foreground">{s.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
