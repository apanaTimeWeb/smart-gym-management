'use client';
// RESPONSIBILITY: Renders the four KPI stat cards (Total, Active, Pending, Expired) for the Members module.
import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useTrainerMemberStatsQuery } from '@/app/trainer/members/members_queries/useTrainerMembersQuery';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

const KPI_CONFIG = [
  { label: 'Total Members', key: 'total',   color: 'text-info',    bg: 'bg-info-bg',    icon: User         },
  { label: 'Active',        key: 'active',  color: 'text-success', bg: 'bg-success-bg', icon: CheckCircle  },
  { label: 'Pending',       key: 'pending', color: 'text-warning', bg: 'bg-warning-bg', icon: Clock        },
  { label: 'Expired',       key: 'expired', color: 'text-danger',  bg: 'bg-danger-bg',  icon: XCircle      },
] as const;

export default function TrainerMembersKPIs() {
  const { data: stats = { total: 0, active: 0, pending: 0, expired: 0 } } = useTrainerMemberStatsQuery();
  const dateSuffix = useDateRangeSuffix();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {KPI_CONFIG.map(s => (
        <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
            <s.icon size={19} className={s.color} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{s.label + dateSuffix}</p>
            <p className="text-xl font-bold text-primary">{stats[s.key]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

