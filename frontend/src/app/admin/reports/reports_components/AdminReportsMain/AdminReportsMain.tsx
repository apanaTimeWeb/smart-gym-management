"use client";
// RESPONSIBILITY: Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels.

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { useAdminReportsStore } from '@/app/admin/reports/reports_store/useAdminReportsStore';
import { useAdminReportsLogic } from '@/app/admin/reports/reports_context/useAdminReportsLogic';
import AdminReportsTabs from '@/app/admin/reports/reports_components/AdminReportsTabs/AdminReportsTabs';
import AdminReportsKPIs from '@/app/admin/reports/reports_components/AdminReportsKPIs/AdminReportsKPIs';
import AdminReportsRevenue from '@/app/admin/reports/reports_components/AdminReportsRevenue/AdminReportsRevenue';
import AdminReportsMembership from '@/app/admin/reports/reports_components/AdminReportsMembership/AdminReportsMembership';
import AdminReportsAttendance from '@/app/admin/reports/reports_components/AdminReportsAttendance/AdminReportsAttendance';
import AdminReportsPayroll from '@/app/admin/reports/reports_components/AdminReportsPayroll/AdminReportsPayroll';
import AdminReportsPnL from '@/app/admin/reports/reports_components/AdminReportsPnL/AdminReportsPnL';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import { AdminDateFilterDropdown } from '@/app/admin/admin_components/AdminShared/AdminDateFilterDropdown';
import { reportsApi } from '@/app/admin/reports/reports_api/AdminReportsApi';
import type { ReportDateRange } from '@/app/admin/reports/reports_types/AdminReportsTypes';

import { useAdminBranchesQueries } from '@/app/admin/branches/branches_context/useAdminBranchesQueries';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

const EXPORT_FORMAT_OPTIONS = [
  { value: 'pdf', label: 'Export as PDF' },
  { value: 'excel', label: 'Export as Excel' },
];

function ReportsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="h-12 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
      <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}

export default function AdminReportsMain() {
  const { activeTab, dateRange, setDateRange, startDate, endDate, setCustomDateRange, selectedGymId, setSelectedGymId } = useAdminReportsStore();
  const { status } = useAdminReportsLogic();
  const { data: branches = [] } = useAdminBranchesQueries();
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<string>('pdf');

  const gymOptions = [
    { value: 'all', label: 'All Gyms' },
    ...(branches as Branch[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await reportsApi.exportReport({ tab: activeTab, format: exportFormat });
      if (res.success && res.data?.url && res.data.url !== '#') {
        const link = document.createElement('a');
        link.href = res.data.url;
        link.download = `report-${activeTab}-${dateRange}.${exportFormat === 'excel' ? 'xlsx' : 'pdf'}`;
        link.click();
      } else {
        // Mock: show browser print dialog as PDF fallback
        if (exportFormat === 'pdf') window.print();
      }
    } finally {
      setExporting(false);
    }
  };

  if (status === 'pending') return <ReportsSkeleton />;

  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Reports" subtitle="Consolidated cross-gym analytics and performance reports" />
      <div className="p-6 space-y-5">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="w-44">
              <AdminSearchableDropdown
                options={gymOptions}
                value={selectedGymId}
                onChange={(v) => setSelectedGymId(v as string)}
                placeholder="All Gyms"
              />
            </div>
            <AdminDateFilterDropdown />
          </div>

          {/* Export Controls */}
          <div className="flex items-center gap-2">
            <div className="w-40 bg-input rounded-lg border-none">
              <AdminSearchableDropdown
                options={EXPORT_FORMAT_OPTIONS}
                value={exportFormat}
                onChange={(v) => setExportFormat(v as string)}
              />
            </div>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-foreground hover:border-primary motion-safe:transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {exporting
                ? <><Loader2 size={15} className="motion-safe:animate-spin" /> Exporting...</>
                : <><Download size={15} /> Export</>
              }
            </button>
          </div>
        </div>

        {/* KPIs */}
        <AdminReportsKPIs />

        {/* Tabs */}
        <AdminReportsTabs />

        {/* Tab Content */}
        {activeTab === 'revenue' && <AdminReportsRevenue />}
        {activeTab === 'membership' && <AdminReportsMembership />}
        {activeTab === 'attendance' && <AdminReportsAttendance />}
        {activeTab === 'payroll' && <AdminReportsPayroll />}
        {activeTab === 'pnl' && <AdminReportsPnL />}

      </div>
    </div>
  );
}