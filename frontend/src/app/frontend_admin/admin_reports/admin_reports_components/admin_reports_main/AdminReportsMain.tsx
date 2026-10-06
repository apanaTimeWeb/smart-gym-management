"use client";
// RESPONSIBILITY: Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels.
import { useTranslations } from 'next-intl';

import type { AdminReportsExportFormat } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';
import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useAdminReportsStore } from '@/app/frontend_admin/admin_reports/admin_reports_store/useAdminReportsStore';
import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';
import AdminReportsTabs from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_tabs/AdminReportsTabs';
import AdminReportsKPIs from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_kpis/AdminReportsKPIs';
import AdminReportsRevenue from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_revenue/AdminReportsRevenue';
import AdminReportsMembership from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_membership/AdminReportsMembership';
import AdminReportsAttendance from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_attendance/AdminReportsAttendance';
import AdminReportsPayroll from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_payroll/AdminReportsPayroll';
import AdminReportsPnL from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_pnl/AdminReportsPnL';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';
import { AdminReportsDateFilterDropdown } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_date_filter/AdminReportsDateFilterDropdown';

import { useAdminReportsBranchReference } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsBranchReference';
import type { AdminReportsBranchReference } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsBranchReferenceTypes';
import { EXPORT_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_reports/admin_reports_constants/AdminReportsConstants';
import AdminReportsSkeleton from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_main/AdminReportsSkeleton';

/**
 * AdminReportsMain renders the admin reports main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsMain: Main entry point for the Reports module. Composes toolbar, tabs, KPIs, and tab content panels.
 * @dependencies Consumes AdminReportsTypes, useAdminReportsStore, useAdminReportsLogic, AdminReportsTabs, AdminReportsKPIs.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsMain() {
  const t = useTranslations();

  const { activeTab, selectedGymId, setSelectedGymId } = useAdminReportsStore();
  const { status, exportStatus, handleExport } = useAdminReportsLogic();
  const { data: branches = [] } = useAdminReportsBranchReference();
  const [exportFormat, setExportFormat] = useState<AdminReportsExportFormat>('pdf');

  const gymOptions = [
    { value: 'all', label: t('reports.AdminAuditRepair.allGyms') },
    ...(branches as AdminReportsBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];



  if (status === 'pending') return <AdminReportsSkeleton />;

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="w-44">
              <AdminLayoutSearchableDropdown
                options={gymOptions}
                value={selectedGymId}
                onChange={(v) => setSelectedGymId(v as string)}
                placeholder={t('reports.admin_reports_main.text_1ea6687cfe')}
               testId="admin_reports-admin_reports-main-change"/>
            </div>
            <AdminReportsDateFilterDropdown />
          </div>
          <div className="flex items-center gap-2">
            {EXPORT_FORMAT_OPTIONS.map((option) => (
              <button key={option.value} type="button" onClick={() => void handleExport(option.value)} disabled={exportStatus === 'pending'} className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm font-medium text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-colors focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-w-11 motion-safe:active:scale-95" data-testid={`admin_reports-admin_reports-main-export-${option.value}`}>
                {exportStatus === 'pending' ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" /> : <Download size={18} strokeWidth={2} />}
                {t(option.value === 'pdf' ? 'reports.AdminReportsMain.exportPdf' : 'reports.AdminReportsMain.exportCsv')}
              </button>
            ))}
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