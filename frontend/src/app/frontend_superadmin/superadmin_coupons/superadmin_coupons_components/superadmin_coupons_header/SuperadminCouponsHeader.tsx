'use client';
/**

 * RESPONSIBILITY: React component SuperadminCouponsHeader owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsDateFilterDropdown, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsHeaderTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the page title, search input, and "Create Coupon" CTA button for the Coupons page. Receives all state via props â€” no API calls.
import { Tag, Plus, Search, Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SuperadminCouponsDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsDateFilterDropdown';
import { SUPERADMIN_COUPON_STATUS_OPTIONS, SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';

import type { SuperadminCouponsHeaderProps } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsHeaderTypes';


/**
 * @description Renders the page title, search input, and "Create Coupon" CTA button for the Coupons page. Receives all state via props â€” no API calls.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCouponsHeader({ searchQuery, onSearchChange, onCreateClick, statusFilter, onStatusFilterChange }: SuperadminCouponsHeaderProps) {
  const t = useTranslations('superadmin_coupons');
    return (<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Tag size={18} className="text-primary"/>
          {t('ui.promotional_coupons_80d2b09d')}</h1>
        <p className="text-sm text-secondary mt-1">{t('ui.manage_global_discount_codes_for_new_saas_su_d04eb68a')}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <SuperadminCouponsDateFilterDropdown />
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input type="text" placeholder={t('ui.search_coupons_773b1b58')} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors w-full sm:w-64" data-testid="superadmin_coupons-superadmin-coupons-header-superadmin-coupons-header-text"/>
        </div>
        
        {onStatusFilterChange && (<div className="w-40 border-none bg-input rounded-lg">
            <SearchableDropdown data-testid="superadmin_coupons-superadmin-coupons-header-status-filter" options={SUPERADMIN_COUPON_STATUS_OPTIONS.map((option) => ({ label: option.label, value: option.value }))} value={statusFilter || SUPERADMIN_COUPON_STATUS_CODES.ALL} onChange={(val) => onStatusFilterChange(String(val))} className="bg-transparent border-border"/>
          </div>)}

        <button onClick={onCreateClick} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-header-coupons-header-create-coupon">
          <Plus size={18}/>
          {t('ui.create_coupon_90e43665')}</button>
      </div>
    </div>);
}
