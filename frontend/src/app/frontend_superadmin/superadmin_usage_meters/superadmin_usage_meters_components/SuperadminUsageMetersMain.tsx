'use client';// RESPONSIBILITY: Renders the Superadmin feature UI for SuperadminUsageMetersMain. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer.
/**
 * RESPONSIBILITY: Renders the Usage Meters dashboard for superadmins to monitor tenant resource limits.
 * DATA FLOW: usageMetersApi -> SuperadminUsageMetersMain -> UI
 */
// RESPONSIBILITY: Renders the SuperadminUsageMetersMain component.
import { HardDrive, MessageSquare, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useUrlState } from '@/hooks/useUrlState';
import { displayValue, formatNumber } from '@/lib/formatters';

import SuperadminUsageMetersProgressBar from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_components/SuperadminUsageMetersProgressBar';
import { SUPERADMIN_USAGE_METERS_DATE_RANGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_constants/SuperadminUsageMetersConstants';
import { useSuperadminUsageMetersPage } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_hooks/useSuperadminUsageMetersPage';
import { getProgressColor } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_utils/SuperadminUsageMetersUtils';

import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes';


/**
 * @description Renders the SuperadminUsageMetersMain component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminUsageMetersMain() {
  const t = useTranslations('superadmin_usage_meters');
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
        return (<div className="p-6 space-y-4" data-testid="superadmin_usage_meters-superadmin-usage-meters-main-page">
        {[1, 2, 3].map(i => (<div key={`skeleton-${i}`} className="h-32 bg-card motion-safe:animate-pulse rounded-xl"/>))}
      </div>);
    }
    return (<div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t('ui.usage_meters_83ceafa1')}</h1>
          <p className="text-secondary mt-1">{t('ui.monitor_gym_resource_consumption_and_billing_c0c9399b')}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-48">
            <SearchableDropdown data-testid="superadmin_usage_meters-superadmin-usage-meters-main-date-range" value={dateRange} onChange={(val) => setParam('range', String(val))} options={SUPERADMIN_USAGE_METERS_DATE_RANGE_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}/>
          </div>

          {dateRange === 'custom' && (<div className="flex items-center gap-2">
              <input type="date" value={customFrom} onChange={(e) => setParam('from', e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_usage_meters-superadmin-usage-meters-main-usage-meters-main-date"/>
              <span className="text-secondary">{t('ui.to_01b6e203')}</span>
              <input type="date" value={customTo} onChange={(e) => setParam('to', e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_usage_meters-superadmin-usage-meters-main-meters-main-date-2"/>
            </div>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayMeters.map((meter: UsageMeter) => {
            const dbGb = meter.databaseGb || 0;
            const mediaGb = meter.mediaGb || ((meter as unknown as Record<string, unknown>).storageGb as number) || 0;
            const totalStorage = dbGb + mediaGb;
            return (<div key={meter.id} className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
            <h3 className="text-lg font-bold text-primary mb-4 truncate" title={displayValue(meter.tenantName)}>{displayValue(meter.tenantName)}</h3>
            
            <div className="space-y-5" data-testid="superadmin_usage_meters-superadmin-usage-meters-main-page-ready">
              {/* SMS Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <MessageSquare size={18}/> {t('ui.total_sms_sent_1742d971')}</span>
                  <span className="text-primary font-semibold">{formatNumber(meter.smsSent)}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <SuperadminUsageMetersProgressBar value={meter.smsSent} limit={meter.smsLimit} className={`rounded-full ${getProgressColor(meter.smsSent, meter.smsLimit)}`}  data-testid="superadmin-usage-meters-superadmin-usage-meters-main-superadmin-usage-meters-progress-bar-1"/>
                </div>
                <p className="text-xs text-secondary mt-1.5">{t('ui.limit_9917a4b3')}{formatNumber(meter.smsLimit)}</p>
              </div>

              {/* Storage Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <HardDrive size={18}/> {t('ui.total_storage_gb_d4a44fab')}</span>
                  <span className="text-primary font-semibold">{formatNumber(totalStorage)} {t('ui.gb_79cba118')}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden flex">
                  <SuperadminUsageMetersProgressBar value={dbGb} limit={meter.storageLimitGb} className="bg-primary text-on-primary" title={`Database: ${formatNumber(dbGb)} GB`}  data-testid="superadmin-usage-meters-superadmin-usage-meters-main-superadmin-usage-meters-progress-bar-2"/>
                  <SuperadminUsageMetersProgressBar value={mediaGb} limit={meter.storageLimitGb} className="bg-warning text-on-warning" title={`Binary: ${formatNumber(mediaGb)} GB`}  data-testid="superadmin-usage-meters-superadmin-usage-meters-main-superadmin-usage-meters-progress-bar-3"/>
                </div>
                <div className="flex justify-between text-xs mt-1.5 text-secondary">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary text-on-primary"/>
                    <span>{t('ui.db_33ae9939')}{dbGb} {t('ui.gb_79cba118')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-warning text-on-warning"/>
                    <span>{t('ui.binary_beef6ec0')}{mediaGb} {t('ui.gb_79cba118')}</span>
                  </div>
                </div>
              </div>

              {/* Personnel Meters */}
              <div className="space-y-4 pt-2 border-t border-border">
                {/* Members */}
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <Users size={18}/> {t('ui.members_ef53538a')}</span>
                    <span className="text-primary font-semibold">
                      {formatNumber((meter.activeMembers ?? 0))} <span className="text-xs text-secondary font-normal">{t('ui.active_4d3d769b')}</span> {t('ui.text_6666cd76')}{formatNumber((meter.totalMembers ?? meter.activeMembers ?? 0))} <span className="text-xs text-secondary font-normal">{t('ui.total_96b01412')}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                    <SuperadminUsageMetersProgressBar value={meter.activeMembers ?? 0} limit={meter.memberLimit ?? 1} className={`rounded-full ${getProgressColor(meter.activeMembers ?? 0, meter.memberLimit ?? 1)}`}  data-testid="superadmin-usage-meters-superadmin-usage-meters-main-superadmin-usage-meters-progress-bar-4"/>
                  </div>
                  <p className="text-xs text-secondary mt-1.5">{t('ui.limit_9917a4b3')}{formatNumber((meter.memberLimit ?? 0))}</p>
                </div>

                {/* Staff */}
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-secondary font-medium">
                      <Users size={18}/> {t('ui.staff_8f7f9363')}</span>
                    <span className="text-primary font-semibold">{formatNumber((meter.staffCount ?? 0))}</span>
                  </div>
                  <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                    <SuperadminUsageMetersProgressBar value={meter.staffCount ?? 0} limit={meter.staffLimit ?? 1} className={`rounded-full ${getProgressColor(meter.staffCount ?? 0, meter.staffLimit ?? 1)}`}  data-testid="superadmin-usage-meters-superadmin-usage-meters-main-superadmin-usage-meters-progress-bar-5"/>
                  </div>
                  <p className="text-xs text-secondary mt-1.5">{t('ui.limit_9917a4b3')}{formatNumber((meter.staffLimit ?? 0))}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex justify-between items-center text-xs text-secondary">
              <span>{t('ui.billing_cycle_ends_949b51af')}</span>
              <span className="font-semibold text-primary">{meter.billingCycleEnd}</span>
            </div>
          </div>);
        })}
      </div>
    </div>);
}
