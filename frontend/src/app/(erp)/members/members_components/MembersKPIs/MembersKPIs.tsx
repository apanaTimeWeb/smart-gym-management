"use client";

import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useMembersContext } from '../../members_context/MembersContext';

export default function MembersKPIs() {
  const { stats } = useMembersContext();

  const kpis = [
    { label: 'Total Members', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50', icon: User },
    { label: 'Active', value: stats.active, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
    { label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
    { label: 'Expired', value: stats.expired, color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
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
