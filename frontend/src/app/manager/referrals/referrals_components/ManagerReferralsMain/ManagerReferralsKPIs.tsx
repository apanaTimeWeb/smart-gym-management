// RESPONSIBILITY: Display 4 key referral stats using ManagerStatCard.
'use client';

import { Users, UserCheck, Gift, CheckCircle } from 'lucide-react';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_context/useManagerReferralsLogic';

export default function ManagerReferralsKPIs() {
  const { kpis, isKpisLoading } = useManagerReferralsLogic();

  if (isKpisLoading || !kpis) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card h-28 rounded-xl border border-border"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ManagerStatCard 
        title="Total Referrals" 
        value={kpis.totalReferrals.toString()} 
        icon={Users} 
        change="+12"
        changeType="up"
        iconBg="var(--primary-subtle)"
        iconColor="var(--primary)"
      />
      <ManagerStatCard 
        title="Converted to Members" 
        value={kpis.totalConverted.toString()} 
        icon={UserCheck} 
        change="+5"
        changeType="up"
        iconBg="rgba(34, 197, 94, 0.1)"
        iconColor="#22c55e"
      />
      <ManagerStatCard 
        title="Pending Rewards" 
        value={kpis.pendingRewards.toString()} 
        icon={Gift} 
        change={kpis.pendingRewards > 5 ? 'Action Needed' : ''}
        changeType={kpis.pendingRewards > 5 ? 'down' : 'neutral'}
        iconBg="rgba(234, 179, 8, 0.1)"
        iconColor="#eab308"
      />
      <ManagerStatCard 
        title="Claimed Rewards" 
        value={kpis.claimedRewards.toString()} 
        icon={CheckCircle} 
        iconBg="var(--primary-subtle)"
        iconColor="var(--primary)"
      />
    </div>
  );
}
