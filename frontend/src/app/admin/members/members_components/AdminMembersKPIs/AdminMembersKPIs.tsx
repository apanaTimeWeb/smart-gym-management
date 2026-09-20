"use client";
// RESPONSIBILITY: Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding).

import { Users, UserCheck, Clock, IndianRupee } from 'lucide-react';
import { useAdminMembersLogic } from '@/app/admin/members/members_context/useAdminMembersLogic';
import { formatCurrency, formatNumber} from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

export default function AdminMembersKPIs() {
  const { summary } = useAdminMembersLogic();
  const dateSuffix = useDateRangeSuffix();
  if (!summary) return null;

  const cards = [
    {
      title: 'Total Members' + dateSuffix,
      value: formatNumber(summary.totalMembers),
      sub: `+${summary.newThisMonth} this month`,
      subColor: 'text-success',
      icon: Users,
      iconBg: 'bg-info-bg',
      iconColor: 'text-info',
    },
    {
      title: 'Active Members' + dateSuffix,
      value: formatNumber(summary.activeMembers),
      sub: `${Math.round((summary.activeMembers / summary.totalMembers) * 100)}% of total`,
      subColor: 'text-secondary',
      icon: UserCheck,
      iconBg: 'bg-success-bg',
      iconColor: 'text-success',
    },
    {
      title: 'Expiring This Month' + dateSuffix,
      value: formatNumber(summary.expiringThisMonth),
      sub: `${summary.expiringThisWeek} expiring this week`,
      subColor: 'text-warning',
      icon: Clock,
      iconBg: 'bg-warning-bg',
      iconColor: 'text-warning',
    },
    {
      title: 'Total Outstanding' + dateSuffix,
      value: formatCurrency(summary.totalOutstanding),
      sub: `${summary.pendingMembers} members with dues`,
      subColor: 'text-danger',
      icon: IndianRupee,
      iconBg: 'bg-danger-bg',
      iconColor: 'text-danger',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.title} className="bg-card rounded-xl p-5 border border-border hover:border-primary motion-safe:transition-all motion-safe:duration-base">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-secondary uppercase tracking-wider">{c.title}</p>
                <p className="text-2xl font-bold text-primary mt-1">{c.value}</p>
                <p className={`text-xs mt-1 font-medium ${c.subColor}`}>{c.sub}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${c.iconBg}`}>
                <Icon size={18} strokeWidth={2} className={c.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}