// RESPONSIBILITY: A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).
'use client';
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SUPERADMIN_INVOICES_DATE_FILTER_OPTIONS } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesConstants';
import { getSuperadminInvoicesPresetRange } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesDateRangeUtils';
import type { SuperadminInvoicesDateFilterBoundary, SuperadminInvoicesDateRange } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesDateFilterTypes';


export function SuperadminInvoicesDateFilterDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const value = (searchParams.get('range') as SuperadminInvoicesDateRange) ?? 'this_month';
    const currentStartDate = searchParams.get('startDate') || '';
    const currentEndDate = searchParams.get('endDate') || '';
    const handleCustomDateChange = useCallback((type: SuperadminInvoicesDateFilterBoundary, val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', 'custom');
        if (type === 'start') {
            if (val)
                params.set('startDate', val);
            else
                params.delete('startDate');
        }
        else {
            if (val)
                params.set('endDate', val);
            else
                params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    const handlePresetChange = useCallback((preset: string) => {
        const { from, to } = getSuperadminInvoicesPresetRange(preset);
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', preset);
        if (preset !== 'custom' && preset !== 'monthly' && preset !== 'yearly') {
            params.set('startDate', from);
            params.set('endDate', to);
        } else if (preset !== 'custom') {
            params.delete('startDate');
            params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    return (<div className="flex items-center gap-2 flex-wrap">
      <div className="w-48 bg-input border border-border rounded-lg shadow-card shrink-0">
        <SearchableDropdown options={SUPERADMIN_INVOICES_DATE_FILTER_OPTIONS as any} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex items-center gap-2 bg-input border border-border rounded-lg shadow-card px-3 py-2 shrink-0">
          <input type="date" value={currentStartDate} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input"/>
          <span className="text-secondary text-sm font-medium">to</span>
          <input type="date" value={currentEndDate} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input"/>
        </div>)}
    </div>);
}






