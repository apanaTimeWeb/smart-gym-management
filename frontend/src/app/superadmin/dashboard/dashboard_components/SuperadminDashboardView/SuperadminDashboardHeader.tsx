import type { TimeRange } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

export function SuperadminDashboardHeader({
  timeRange,
  startDate,
  endDate,
  handleTimeRangeChange,
  setStartDate,
  setEndDate
}: {
  timeRange: TimeRange;
  startDate: string;
  endDate: string;
  handleTimeRangeChange: (r: TimeRange) => void;
  setStartDate: (s: string) => void;
  setEndDate: (s: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">SaaS Overview</h1>
        <p className="text-secondary mt-1 text-sm">
          Monitor the health and growth of your Multi-Tenant SaaS platform.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        {timeRange === 'custom' && (
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-secondary" htmlFor="dashboard-start-date">From:</label>
            <input
              id="dashboard-start-date"
              type="date"
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              aria-label="Start Date"
            />
            <label className="text-sm font-medium text-secondary ml-1" htmlFor="dashboard-end-date">To:</label>
            <input
              id="dashboard-end-date"
              type="date"
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              aria-label="End Date"
            />
          </div>
        )}
        <select
          value={timeRange}
          aria-label="Select time range"
          onChange={(e) => handleTimeRangeChange(e.target.value as TimeRange)}
          className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
    </div>
  );
}
