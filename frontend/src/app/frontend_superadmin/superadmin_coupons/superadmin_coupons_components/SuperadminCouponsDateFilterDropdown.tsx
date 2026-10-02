'use client';
/**
 * RESPONSIBILITY: React component SuperadminCouponsDateFilterDropdown owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useCallback, useRouter, useSearchParams, usePathname
 * MODULE DEPENDENCIES: next/navigation, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateRangeUtils, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsDateFilterTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_COUPONS_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
import { getSuperadminCouponsPresetRange } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateRangeUtils';

import type { SuperadminCouponsDateFilterBoundary, SuperadminCouponsDateRange } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsDateFilterTypes';



/**
 * Responsibility: Renders the SuperadminCouponsDateFilterDropdown UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminCouponsDateFilterDropdown() {
  const t = useTranslations('superadmin_coupons');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const value = (searchParams.get('range') as SuperadminCouponsDateRange) ?? 'this_month';
    const currentStartDate = searchParams.get('startDate') || '';
    const currentEndDate = searchParams.get('endDate') || '';
    const handleCustomDateChange = useCallback((type: SuperadminCouponsDateFilterBoundary, val: string) => {
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
        const { from, to } = getSuperadminCouponsPresetRange(preset);
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
        <SearchableDropdown data-testid="superadmin_coupons-superadmin-coupons-date-filter-dropdown-date-filter" options={SUPERADMIN_COUPONS_DATE_FILTER_OPTIONS.map((option) => ({ label: option.label, value: option.value }))} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex items-center gap-2 bg-input border border-border rounded-lg shadow-card px-3 py-2 shrink-0">
          <input type="date" value={currentStartDate} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input" data-testid="superadmin_coupons-superadmin-coupons-date-filter-dropdown-date-filter-dropdown-date"/>
          <span className="text-secondary text-sm font-medium">{t('ui.to_01b6e203')}</span>
          <input type="date" value={currentEndDate} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="bg-transparent text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input" data-testid="superadmin_coupons-superadmin-coupons-date-filter-dropdown-filter-dropdown-date-2"/>
        </div>)}
    </div>);
}

