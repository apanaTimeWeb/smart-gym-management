"use client";
import { formatNumber } from '@/lib/formatters';
// RESPONSIBILITY: KPI stat cards for the Announcements module.

import { Megaphone, CheckCircle, Clock, XCircle, Eye, Pin } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_layout/AdminShared/AdminStatCard';
import { useAdminAnnouncementsLogic } from '@/app/admin/announcements/announcements_context/useAdminAnnouncementsLogic';

export default function AdminAnnouncementsKPIs() {
  const { kpis } = useAdminAnnouncementsLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      <AdminStatCard title="Total Announcements" value={kpis.total} icon={Megaphone} iconBg="bg-primary-subtle" iconColor="text-primary" />
      <AdminStatCard title="Active Now" value={kpis.active} change="live & visible" changeType="up" icon={CheckCircle} iconBg="bg-success-bg" iconColor="text-success" />
      <AdminStatCard title="Scheduled" value={kpis.scheduled} change="upcoming" changeType="neutral" icon={Clock} iconBg="bg-info-bg" iconColor="text-info" />
      <AdminStatCard title="Expired" value={kpis.expired} icon={XCircle} iconBg="bg-danger-bg" iconColor="text-danger" />
      <AdminStatCard title="Total Views" value={formatNumber(kpis.totalViews)} change="across all" changeType="up" icon={Eye} iconBg="bg-primary-subtle" iconColor="text-primary" />
      <AdminStatCard title="Pinned" value={kpis.pinned} change="always on top" changeType="neutral" icon={Pin} iconBg="bg-warning-bg" iconColor="text-warning" />
    </div>
  );
}