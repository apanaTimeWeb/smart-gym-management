/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCouponsStatsBarTypes owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Type contract extracted from SuperadminCouponsStatsBar.tsx; no business behavior.

import type { SUPERADMIN_COUPONS_KPI_TYPES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
export type SuperadminCouponsKpi = typeof SUPERADMIN_COUPONS_KPI_TYPES[number];

export interface SuperadminCouponsStatsBarProps {
    activeCoupons: number;
    totalRedeemed: number;
    totalCoupons: number;
    activeKpi: SuperadminCouponsKpi;
    onKpiClick: (kpi: SuperadminCouponsKpi) => void;
}
