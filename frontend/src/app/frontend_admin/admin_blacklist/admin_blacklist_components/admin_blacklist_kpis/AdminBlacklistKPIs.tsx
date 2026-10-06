"use client";
// RESPONSIBILITY: KPI cards for the Blacklist module.
import { useTranslations } from 'next-intl';

import { Ban, Globe, Building2, CalendarPlus } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistLogic';

/**
 * AdminBlacklistKPIs renders the admin blacklist kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBlacklistKPIs: KPI cards for the Blacklist module.
 * @dependencies Consumes AdminLayoutStatCard, useAdminBlacklistLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBlacklistKPIs() {
  const t = useTranslations();

  const { kpis } = useAdminBlacklistLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_blacklist-adminblacklistkpis-summary">
      <AdminLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_697df5412b')} value={kpis.totalBlacklisted} icon={Ban} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_blacklist-adminblacklistkpis-kpi-1"/>
      <AdminLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_d0838925b1')} value={kpis.globalBans} change={t('blacklist.admin_blacklist_kpis.auto_acrossAllGyms')} changeType="neutral" icon={Globe} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_blacklist-adminblacklistkpis-kpi-2"/>
      <AdminLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_d4569d3f03')} value={kpis.gymSpecificBans} change={t('blacklist.admin_blacklist_kpis.auto_targetedBranches')} changeType="neutral" icon={Building2} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_blacklist-adminblacklistkpis-kpi-3"/>
      <AdminLayoutStatCard title={t('blacklist.admin_blacklist_kpis.text_c161761c78')} value={kpis.addedThisMonth} icon={CalendarPlus} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_blacklist-adminblacklistkpis-kpi-4"/>
    </div>
  );
}