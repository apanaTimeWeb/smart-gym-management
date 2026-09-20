"use client";
// RESPONSIBILITY: Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels.

import type { AdminReportsExportFormat } from '@/app/admin/reports/reports_types/AdminReportsTypes';
import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useAdminReportsStore } from '@/app/admin/reports/reports_store/useAdminReportsStore';
import { useAdminReportsLogic } from '@/app/admin/reports/reports_context/useAdminReportsLogic';
import AdminReportsTabs from '@/app/admin/reports/reports_components/AdminReportsTabs/AdminReportsTabs';
import AdminReportsKPIs from '@/app/admin/reports/reports_components/AdminReportsKPIs/AdminReportsKPIs';
import AdminReportsRevenue from '@/app/admin/reports/reports_components/AdminReportsRevenue/AdminReportsRevenue';
import AdminReportsMembership from '@/app/admin/reports/reports_components/AdminReportsMembership/AdminReportsMembership';
import AdminReportsAttendance from '@/app/admin/reports/reports_components/AdminReportsAttendance/AdminReportsAttendance';
import AdminReportsPayroll from '@/app/admin/reports/reports_components/AdminReportsPayroll/AdminReportsPayroll';
import AdminReportsPnL from '@/app/admin/reports/reports_components/AdminReportsPnL/AdminReportsPnL';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { AdminReportsDateFilterDropdown } from '@/app/admin/reports/reports_components/AdminReportsDateFilter/AdminReportsDateFilterDropdown';

import { useAdminReportsBranchReference } from '@/app/admin/reports/reports_context/useAdminReportsBranchReference';
import type { AdminReportsBranchReference } from '@/app/admin/reports/reports_types/AdminReportsBranchReferenceTypes';
import { EXPORT_FORMAT_OPTIONS } from '@/app/admin/reports/reports_utils/AdminReportsSharedConstants';
import AdminReportsSkeleton from '@/app/admin/reports/reports_components/AdminReportsMain/AdminReportsSkeleton';

export default function AdminReportsMain() {
  const { activeTab, selectedGymId, setSelectedGymId } = useAdminReportsStore();
  const { status, exportReport, isExporting } = useAdminReportsLogic();
  const { data: branches = [] } = useAdminReportsBranchReference();
  const [exportFormat, setExportFormat] = useState<AdminReportsExportFormat>('pdf');

  const gymOptions = [
    { value: 'all', label: 'All Gyms' },
    ...(branches as AdminReportsBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  const handleExport = () => exportReport(exportFormat);

  if (status === 'pending') return <AdminReportsSkeleton />;

  return (
    <div className="min-h-full pb-10">
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
            <AdminReportsDateFilterDropdown />
          </div>

          {/* Export Controls */}
          <div className="flex items-center gap-2">
            <div className="w-40 bg-input rounded-lg border-none">
              <AdminSearchableDropdown
                options={EXPORT_FORMAT_OPTIONS}
                value={exportFormat}
                onChange={(v) => setExportFormat(v as AdminReportsExportFormat)}
              />
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-primary hover:border-primary motion-safe:transition-colors disabled:opacity-60 disabled:cursor-not-allowed motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              {isExporting
                ? <><Loader2 size={15} className="motion-safe:animate-spin motion-safe:duration-base" /> Exporting...</>
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