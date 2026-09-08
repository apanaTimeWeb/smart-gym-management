'use client';
// RESPONSIBILITY: Toolbar for the Admin Branches module — time range selector and custom date range inputs.
import { Calendar, ShieldCheck } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/admin/branches/branches_context/useAdminBranchesLogic';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import type { TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

const TIME_RANGE_OPTIONS = [
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export default function AdminBranchesToolbar() {
  const { timeRange, setTimeRange, startDate, setStartDate, endDate, setEndDate } = useAdminBranchesLogic();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 border border-border rounded-xl">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Branch Analytics</h2>
          <span className="text-xs text-secondary flex items-center gap-1 mt-0.5">
            <ShieldCheck size={12} className="text-success" /> Read-only • Click any metric to see details
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3 items-center flex-wrap">
        {timeRange === 'custom' && (
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-secondary">From:</label>
            <input
              type="date"
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label className="text-sm font-medium text-secondary">To:</label>
            <input
              type="date"
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        )}
        <div className="w-44">
          <AdminSearchableDropdown
            options={TIME_RANGE_OPTIONS}
            value={timeRange}
            onChange={(val) => {
              setTimeRange(val as TimeRange);
              if (val !== 'custom') {
                setStartDate('');
                setEndDate('');
              }
            }}
            placeholder="Select range"
          />
        </div>
      </div>
    </div>
  );
}
