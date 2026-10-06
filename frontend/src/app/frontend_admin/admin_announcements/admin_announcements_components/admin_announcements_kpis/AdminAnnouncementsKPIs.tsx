"use client";
// RESPONSIBILITY: KPI stat cards for the Announcements module.
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/app/frontend_admin/admin_announcements/admin_announcements_utils/AdminAnnouncementsFormatters';

import { Megaphone, CheckCircle, Clock, XCircle, Eye, Pin } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_announcements/admin_announcements_hooks/useAdminAnnouncementsLogic';

/**
 * AdminAnnouncementsKPIs renders the admin announcements kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAnnouncementsKPIs: KPI stat cards for the Announcements module.
 * @dependencies Consumes AdminAnnouncementsFormatters, AdminLayoutStatCard, useAdminAnnouncementsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAnnouncementsKPIs() {
  const locale = useLocale();
  const t = useTranslations();

  const { kpis } = useAdminAnnouncementsLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin_announcements-adminannouncementskpis-summary">
      <AdminLayoutStatCard title={t('announcements.admin_announcements_kpis.text_4e68410f3b')} value={kpis.total} icon={Megaphone} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_announcements-adminannouncementskpis-kpi-1"/>
      <AdminLayoutStatCard title={t('announcements.admin_announcements_kpis.text_9644b22eec')} value={kpis.active} change={t('announcements.admin_announcements_kpis.auto_liveVisible')} changeType="up" icon={CheckCircle} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_announcements-adminannouncementskpis-kpi-2"/>
      <AdminLayoutStatCard title={t('announcements.admin_announcements_kpis.text_1cd1bdad46')} value={kpis.scheduled} change={t('announcements.admin_announcements_kpis.auto_upcoming')} changeType="neutral" icon={Clock} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_announcements-adminannouncementskpis-kpi-3"/>
      <AdminLayoutStatCard title={t('announcements.admin_announcements_kpis.text_a689a999a5')} value={kpis.expired} icon={XCircle} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_announcements-adminannouncementskpis-kpi-4"/>
      <AdminLayoutStatCard title={t('announcements.admin_announcements_kpis.text_d7f83b735d')} value={formatNumber(kpis.totalViews, locale)} change={t('announcements.admin_announcements_kpis.auto_acrossAll')} changeType="up" icon={Eye} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_announcements-adminannouncementskpis-kpi-5"/>
      <AdminLayoutStatCard title={t('announcements.admin_announcements_kpis.text_f9312169ef')} value={kpis.pinned} change={t('announcements.admin_announcements_kpis.auto_alwaysOnTop')} changeType="neutral" icon={Pin} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_announcements-adminannouncementskpis-kpi-6"/>
    </div>
  );
}