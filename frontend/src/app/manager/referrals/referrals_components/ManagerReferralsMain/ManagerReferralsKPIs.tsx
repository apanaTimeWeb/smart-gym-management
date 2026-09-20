// RESPONSIBILITY: Display 4 key referral stats using ManagerStatCard.
'use client';
import { Users, UserCheck, Gift, CheckCircle } from 'lucide-react';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_hooks/ManagerUseManagerReferralsLogic';


export default function ManagerReferralsKPIs() {
  const { kpis, isKpisLoading } = useManagerReferralsLogic();
  const dateSuffix = useDateRangeSuffix();

  if (isKpisLoading || !kpis) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 motion-safe:animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={`skeleton-${i}`} className="bg-card h-28 rounded-xl border border-border"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ManagerStatCard 
        title={`Total Referrals${dateSuffix}`} 
        value={kpis.totalReferrals.toString()} 
        icon={Users} 
        change="+12"
        changeType="up"
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <ManagerStatCard 
        title={`Converted to Members${dateSuffix}`} 
        value={kpis.totalConverted.toString()} 
        icon={UserCheck} 
        change="+5"
        changeType="up"
        iconBg="bg-success-bg"
        iconColor="text-success"
      />
      <ManagerStatCard 
        title={`Pending Rewards${dateSuffix}`} 
        value={kpis.pendingRewards.toString()} 
        icon={Gift} 
        change={kpis.pendingRewards > 5 ? 'Action Needed' : ''}
        changeType={kpis.pendingRewards > 5 ? 'down' : 'neutral'}
        iconBg="bg-warning-bg"
        iconColor="text-warning"
      />
      <ManagerStatCard 
        title={`Claimed Rewards${dateSuffix}`} 
        value={kpis.claimedRewards.toString()} 
        icon={CheckCircle} 
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
    </div>
  );
}
