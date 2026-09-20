// RESPONSIBILITY: Renders the four KPI stat cards (Total, Active, Pending, Expired) for the Members module.
'use client';
import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useTrainerMemberStatsQuery } from '@/app/trainer/members/members_queries/useTrainerMembersQuery';
import { useTrainerMembersFilters } from '@/app/trainer/members/members_utils/useTrainerMembersFilters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

const KPI_CONFIG = [
  { label: 'Total Members', key: 'total',   color: 'text-info',    bg: 'bg-info-bg',    icon: User         },
  { label: 'Active',        key: 'active',  color: 'text-success', bg: 'bg-success-bg', icon: CheckCircle  },
  { label: 'Pending',       key: 'pending', color: 'text-warning', bg: 'bg-warning-bg', icon: Clock        },
  { label: 'Expired',       key: 'expired', color: 'text-danger',  bg: 'bg-danger-bg',  icon: XCircle      },
] as const;

export default function TrainerMembersKPIs() {
  const { data } = useTrainerMemberStatsQuery();
  const stats = data ?? { total: 0, active: 0, pending: 0, expired: 0 };
  const dateSuffix = useDateRangeSuffix();
  const { statusFilter, setStatusFilter } = useTrainerMembersFilters();

  const statusByKey = { total: 'All', active: 'ACTIVE', pending: 'PENDING', expired: 'EXPIRED' } as const;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {KPI_CONFIG.map(s => {
        const active = statusFilter === statusByKey[s.key];
        return (
          <button key={s.label} type="button" onClick={() => setStatusFilter(statusByKey[s.key])} aria-pressed={active} className={`bg-card rounded-xl p-4 shadow-card border text-left flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? 'border-primary bg-primary-subtle' : 'border-border'}`}>
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`} aria-hidden="true">
              <s.icon size={19} className={s.color} />
            </div>
            <div>
              <p className="text-xs text-secondary font-medium">{s.label + dateSuffix}</p>
              <p className="text-xl font-bold text-primary">{stats[s.key]}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

