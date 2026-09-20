// RESPONSIBILITY: Renders the Superadmin feature UI for SuperadminUsageMetersClient. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer.
'use client';
/**
 * RESPONSIBILITY: Renders the Usage Meters dashboard for superadmins to monitor tenant resource limits.
 * DATA FLOW: usageMetersApi -> SuperadminUsageMetersClient -> UI
 */
// RESPONSIBILITY: Renders the SuperadminUsageMetersClient component.
import { useSuperadminUsageMetersPage } from '@/app/superadmin/usage-meters/usage-meters_utils/useSuperadminUsageMetersPage';
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/SuperadminUsageMetersTypes';
import { HardDrive, MessageSquare, Users } from 'lucide-react';
import { getProgressColor, getPercentage } from '@/app/superadmin/usage-meters/usage-meters_utils/SuperadminUsageMetersUtils';
import { displayValue, formatNumber } from '@/lib/formatters';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useUrlState } from '@/hooks/useUrlState';
import { SUPERADMIN_USAGE_METERS_DATE_RANGE_OPTIONS } from '@/app/superadmin/usage-meters/usage-meters_utils/SuperadminUsageMetersConstants';
export default function SuperadminUsageMetersClient() {
    const { getParam, setParam } = useUrlState();
    const dateRange = getParam('range', 'this_month');
    const customFrom = getParam('from', '');
    const customTo = getParam('to', '');
    const query = useSuperadminUsageMetersPage(
        dateRange === 'custom' ? { range: dateRange, ...(customFrom ? { from: customFrom } : {}), ...(customTo ? { to: customTo } : {}) } : { range: dateRange }
    );
    const { data: queryData, isPending } = query;

        const displayMeters = queryData?.data || [];
    if (isPending) {
        return (<div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (<div key={`skeleton-${i}`} className="h-32 bg-card motion-safe:animate-pulse rounded-xl"/>))}
      </div>);
    }
    return (<div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Usage Meters</h1>
          <p className="text-secondary mt-1">Monitor gym resource consumption and billing limits.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-48">
            <SearchableDropdown value={dateRange} onChange={(val) => setParam('range', String(val))} options={SUPERADMIN_USAGE_METERS_DATE_RANGE_OPTIONS as any}/>
          </div>

          {dateRange === 'custom' && (<div className="flex items-center gap-2">
              <input type="date" value={customFrom} onChange={(e) => setParam('from', e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"/>
              <span className="text-secondary">to</span>
              <input type="date" value={customTo} onChange={(e) => setParam('to', e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"/>
            </div>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayMeters.map((meter: UsageMeter) => {
            const dbGb = meter.databaseGb || 0;
            const mediaGb = meter.mediaGb || ((meter as unknown as Record<string, unknown>).storageGb as number) || 0;
            const totalStorage = dbGb + mediaGb;
            return (<div key={meter.id} className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card motion-safe:transition-shadow">
            <h3 className="text-lg font-bold text-primary mb-4 truncate" title={displayValue(meter.tenantName)}>{displayValue(meter.tenantName)}</h3>
            
            <div className="space-y-5">
              {/* SMS Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <MessageSquare size={18}/> Total SMS Sent
                  </span>
                  <span className="text-primary font-semibold">{formatNumber(meter.smsSent)}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getProgressColor(meter.smsSent, meter.smsLimit)}`} style={{ width: `${getPercentage(meter.smsSent, meter.smsLimit)}%` }}/>
                </div>
                <p className="text-xs text-secondary mt-1.5">Limit: {formatNumber(meter.smsLimit)}</p>
              </div>

              {/* Storage Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <HardDrive size={18}/> Total Storage (GB)
                  </span>
                  <span className="text-primary font-semibold">{formatNumber(totalStorage)} GB
                  </span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary" style={{ width: `${getPercentage(dbGb, meter.storageLimitGb)}%` }} title={`Database: ${formatNumber(dbGb)} GB`}/>
                  <div className="h-full bg-warning" style={{ width: `${getPercentage(mediaGb, meter.storageLimitGb)}%` }} title={`Binary: ${formatNumber(mediaGb)} GB`}/>
                </div>
                <div className="flex justify-between text-xs mt-1.5 text-secondary">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary"/>
                    <span>DB: {dbGb} GB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-warning"/>
                    <span>Binary: {mediaGb} GB</span>
                  </div>
                </div>
              </div>

              {/* Personnel Meters */}
              <div className="space-y-4 pt-2 border-t border-border">
                {/* Members */}
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <Users size={18}/> Members
                    </span>
                    <span className="text-primary font-semibold">
                      {formatNumber((meter.activeMembers ?? 0))} <span className="text-xs text-secondary font-normal">Active</span> / {formatNumber((meter.totalMembers ?? meter.activeMembers ?? 0))} <span className="text-xs text-secondary font-normal">Total</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${getProgressColor(meter.activeMembers ?? 0, meter.memberLimit ?? 1)}`} style={{ width: `${getPercentage(meter.activeMembers ?? 0, meter.memberLimit ?? 1)}%` }}/>
                  </div>
                  <p className="text-xs text-secondary mt-1.5">Limit: {formatNumber((meter.memberLimit ?? 0))}</p>
                </div>

                {/* Staff */}
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <Users size={18}/> Staff
                    </span>
                    <span className="text-primary font-semibold">{formatNumber((meter.staffCount ?? 0))}</span>
                  </div>
                  <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${getProgressColor(meter.staffCount ?? 0, meter.staffLimit ?? 1)}`} style={{ width: `${getPercentage(meter.staffCount ?? 0, meter.staffLimit ?? 1)}%` }}/>
                  </div>
                  <p className="text-xs text-secondary mt-1.5">Limit: {formatNumber((meter.staffLimit ?? 0))}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex justify-between items-center text-xs text-secondary">
              <span>Billing Cycle Ends:</span>
              <span className="font-semibold text-primary">{meter.billingCycleEnd}</span>
            </div>
          </div>);
        })}
      </div>
    </div>);
}
