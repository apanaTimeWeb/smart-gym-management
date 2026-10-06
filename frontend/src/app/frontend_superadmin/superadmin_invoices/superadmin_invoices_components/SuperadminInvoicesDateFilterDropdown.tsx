// RESPONSIBILITY: Renders/orchestrates SuperadminInvoicesDateFilterDropdown within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminInvoicesDateFilterDropdown owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useCallback, useRouter, useSearchParams, usePathname
 * MODULE DEPENDENCIES: next/navigation, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesDateRangeUtils, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesDateFilterTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_INVOICES_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';
import { getSuperadminInvoicesPresetRange } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesDateRangeUtils';

import type { SuperadminInvoicesDateFilterBoundary, SuperadminInvoicesDateRange } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesDateFilterTypes';



/**
 * Responsibility: Renders the SuperadminInvoicesDateFilterDropdown UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminInvoicesDateFilterDropdown() {
  const t = useTranslations('superadmin_invoices');
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
        <SearchableDropdown data-testid="superadmin_invoices-superadmin-invoices-date-filter-dropdown-date-filter" options={SUPERADMIN_INVOICES_DATE_FILTER_OPTIONS.map((option) => ({ label: option.label, value: option.value }))} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex items-center gap-2 bg-input border border-border rounded-lg shadow-card px-3 py-2 shrink-0">
          <input type="date" value={currentStartDate} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input" data-testid="superadmin_invoices-superadmin-invoices-date-filter-dropdown-date-filter-dropdown-date"/>
          <span className="text-secondary text-sm font-medium">{t('ui.to_01b6e203')}</span>
          <input type="date" value={currentEndDate} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input" data-testid="superadmin_invoices-superadmin-invoices-date-filter-dropdown-filter-dropdown-date-2"/>
        </div>)}
    </div>);
}

