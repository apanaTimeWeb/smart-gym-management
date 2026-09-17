// RESPONSIBILITY: Pure View component for the Dashboard date filter dropdown, consuming its local hook.
'use client';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { DASHBOARD_DATE_FILTER_OPTIONS } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterConstants';
import { useSuperadminDashboardDateFilter } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardDateFilterDropdown/useSuperadminDashboardDateFilter';
export function SuperadminDashboardDateFilterDropdown() {
    const { value, customStart, customEnd, handlePresetChange, handleCustomDateChange } = useSuperadminDashboardDateFilter();
    return (<div className="flex items-center gap-2 flex-wrap">
      <div className="w-48 bg-input border border-border rounded-lg shadow-sm shrink-0">
        <SearchableDropdown options={DASHBOARD_DATE_FILTER_OPTIONS as unknown as {
        value: string;
        label: string;
    }[]} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex items-center gap-2 bg-input border border-border rounded-lg shadow-sm px-3 py-2 shrink-0">
          <input type="date" value={customStart} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="bg-transparent text-sm text-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page custom-date-input"/>
          <span className="text-secondary text-sm font-medium">to</span>
          <input type="date" value={customEnd} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="bg-transparent text-sm text-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page custom-date-input"/>
        </div>)}
    </div>);
}
