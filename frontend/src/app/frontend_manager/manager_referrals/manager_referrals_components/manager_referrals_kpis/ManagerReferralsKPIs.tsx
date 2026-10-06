// RESPONSIBILITY: Renders ManagerReferralsKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users, UserCheck, Gift, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';
import { useManagerReferralsLogic } from '@/app/frontend_manager/manager_referrals/manager_referrals_hooks/useManagerReferralsLogic';


/** @description Display 4 key referral stats using ManagerStatCard. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerReferralsKPIs() {
  const t = useTranslations('MANAGER_REFERRALS');
  const { kpis, isKpisLoading } = useManagerReferralsLogic();
  const dateSuffix = useDateRangeSuffix();

  if (isKpisLoading || !kpis) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 motion-safe:animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={`skeleton-${i}`} className="bg-card h-28 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ManagerStatCard 
        title={t("TEXT_KPI_TOTAL_REFERRALS") + dateSuffix} 
        value={kpis.totalReferrals.toString()} 
        icon={Users} 
        change={undefined}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <ManagerStatCard 
        title={t("TEXT_KPI_CONVERTED_MEMBERS") + dateSuffix} 
        value={kpis.totalConverted.toString()} 
        icon={UserCheck} 
        change={undefined}
        iconBg="bg-success-bg"
        iconColor="text-success"
      />
      <ManagerStatCard 
        title={t("TEXT_KPI_PENDING_REWARDS") + dateSuffix} 
        value={kpis.pendingRewards.toString()} 
        icon={Gift} 
        change={kpis.pendingRewards > 5 ? t('TEXT_KPI_ACTION_NEEDED') : undefined}
        changeType={kpis.pendingRewards > 5 ? 'down' : 'neutral'}
        iconBg="bg-warning-bg"
        iconColor="text-warning"
      />
      <ManagerStatCard 
        title={t("TEXT_KPI_CLAIMED_REWARDS") + dateSuffix} 
        value={kpis.claimedRewards.toString()} 
        icon={CheckCircle} 
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
    </div>
  );
}
