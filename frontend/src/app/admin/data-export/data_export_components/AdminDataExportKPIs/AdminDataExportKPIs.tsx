"use client";
import { formatNumber } from '@/lib/formatters';
// RESPONSIBILITY: KPI cards for the Data Export module.

import { Download, Rows3, CalendarCheck, Loader2 } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_layout/AdminShared/AdminStatCard';
import { useAdminDataExportLogic } from '@/app/admin/data-export/data_export_context/useAdminDataExportLogic';

export default function AdminDataExportKPIs() {
  const { kpis } = useAdminDataExportLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard title="Total Exports" value={kpis.totalExports} icon={Download} iconBg="bg-primary-subtle" iconColor="text-primary" />
      <AdminStatCard title="Total Rows Exported" value={formatNumber(kpis.totalRowsExported)} change="all time" changeType="neutral" icon={Rows3} iconBg="bg-info-bg" iconColor="text-info" />
      <AdminStatCard title="Last Export" value={kpis.lastExportDate} icon={CalendarCheck} iconBg="bg-success-bg" iconColor="text-success" />
      <AdminStatCard title="Processing Jobs" value={kpis.pendingJobs} change="in queue" changeType="neutral" icon={Loader2} iconBg="bg-warning-bg" iconColor="text-warning" />
    </div>
  );
}