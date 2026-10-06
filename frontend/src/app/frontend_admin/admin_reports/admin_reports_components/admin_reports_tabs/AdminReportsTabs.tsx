"use client";
// RESPONSIBILITY: Renders the tab navigation bar for the Reports module.
import { useTranslations } from 'next-intl';
import { REPORT_TABS } from '@/app/frontend_admin/admin_reports/admin_reports_constants/AdminReportsConstants';
import { useAdminReportsStore } from '@/app/frontend_admin/admin_reports/admin_reports_store/useAdminReportsStore';
import type { ReportTab } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';

/**
 * AdminReportsTabs renders the admin reports tabs UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsTabs: Renders the tab navigation bar for the Reports module.
 * @dependencies Consumes AdminReportsConstants, useAdminReportsStore, AdminReportsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsTabs() {
  const t = useTranslations();
  const { activeTab, setActiveTab } = useAdminReportsStore();

  return (
    <div className="flex gap-1 bg-input rounded-xl p-1 overflow-x-auto custom-scrollbar">
      {REPORT_TABS.map((tab , __testIdIndex20) => (
        <button type="button"
          key={tab.value}
          onClick={() => setActiveTab(tab.value as ReportTab)}
          className={`ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap motion-safe:transition-all motion-safe:duration-base ${
            activeTab === tab.value
              ? 'bg-card text-primary shadow-card border border-border'
              : 'text-secondary hover:text-primary'
          }`}
         data-testid={`admin_reports-admin_reports-tabs-click-map20-${__testIdIndex20}-1`}>
          {t(tab.labelKey)}
        </button>
      ))}
    </div>
  );
}