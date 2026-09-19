"use client";
// RESPONSIBILITY: Renders the tab navigation bar for the Reports module.

import { REPORT_TABS } from '@/app/admin/reports/reports_utils/AdminReportsSharedConstants';
import { useAdminReportsStore } from '@/app/admin/reports/reports_store/useAdminReportsStore';
import type { ReportTab } from '@/app/admin/reports/reports_types/AdminReportsTypes';

export default function AdminReportsTabs() {
  const { activeTab, setActiveTab } = useAdminReportsStore();

  return (
    <div className="flex gap-1 bg-input rounded-xl p-1 overflow-x-auto custom-scrollbar">
      {REPORT_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value as ReportTab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap motion-safe:transition-all motion-safe:duration-base ${
            activeTab === tab.value
              ? 'bg-card text-primary shadow-card border border-border'
              : 'text-secondary hover:text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}