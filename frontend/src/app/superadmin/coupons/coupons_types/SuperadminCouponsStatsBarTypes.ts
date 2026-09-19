// RESPONSIBILITY: Type contract extracted from SuperadminCouponsStatsBar.tsx; no business behavior.


export const SUPERADMIN_COUPONS_KPI_TYPES = ['ALL', 'ACTIVE', 'REDEEMED'] as const;
export type SuperadminCouponsKpi = typeof SUPERADMIN_COUPONS_KPI_TYPES[number];

export interface SuperadminCouponsStatsBarProps {
    activeCoupons: number;
    totalRedeemed: number;
    totalCoupons: number;
    activeKpi: SuperadminCouponsKpi;
    onKpiClick: (kpi: SuperadminCouponsKpi) => void;
}
