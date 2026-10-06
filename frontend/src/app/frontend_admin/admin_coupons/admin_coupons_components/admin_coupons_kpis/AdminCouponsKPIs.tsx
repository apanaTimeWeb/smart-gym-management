"use client";
// RESPONSIBILITY: Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data.
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AdminCouponsFormatCurrency } from '@/app/frontend_admin/admin_coupons/admin_coupons_utils/AdminCouponsFormatCurrency';
import { formatNumber } from '@/app/frontend_admin/admin_coupons/admin_coupons_utils/AdminCouponsFormatters';

import { Tag, CheckCircle, BarChart2, TrendingDown } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsLogic';
import { COUPON_STATUS } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsConstants';

/**
 * AdminCouponsKPIs renders the admin coupons kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCouponsKPIs: Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data.
 * @dependencies Consumes AdminCouponsFormatCurrency, AdminCouponsFormatters, AdminLayoutStatCard, useAdminCouponsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCouponsKPIs() {
  const t = useTranslations();

  const locale = useLocale();
  const { allCoupons } = useAdminCouponsLogic();

  const totalCoupons = allCoupons.length;
  const activeCoupons = allCoupons.filter((c) => c.status === COUPON_STATUS.ACTIVE).length;
  const totalRedeemed = allCoupons.reduce((sum: number, c) => sum + c.usedCount, 0);
  const revenueLost = allCoupons.reduce((sum: number, c) => {
    const avgDiscount = c.type === 'flat' ? c.value : Math.min(c.value * 10, c.maxDiscount || c.value * 10);
    return sum + c.usedCount * avgDiscount;
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_coupons-admincouponskpis-summary">
      <AdminLayoutStatCard title={t('coupons.admin_coupons_kpis.text_7d485b4ab7')} value={totalCoupons} icon={Tag} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_coupons-admincouponskpis-kpi-1"/>
      <AdminLayoutStatCard title={t('coupons.admin_coupons_kpis.text_9ca2d93313')} value={activeCoupons} change={t('coupons.admin_coupons_kpis.auto_currentlyLive')} changeType="up" icon={CheckCircle} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_coupons-admincouponskpis-kpi-2"/>
      <AdminLayoutStatCard title={t('coupons.admin_coupons_kpis.text_fb84cffc14')} value={formatNumber(totalRedeemed, locale)} change={t('coupons.admin_coupons_kpis.auto_allTime')} changeType="neutral" icon={BarChart2} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_coupons-admincouponskpis-kpi-3"/>
      <AdminLayoutStatCard title={t('coupons.admin_coupons_kpis.text_38070154ce')} value={AdminCouponsFormatCurrency(revenueLost, locale)} change={t('coupons.admin_coupons_kpis.auto_toDiscounts')} changeType="down" icon={TrendingDown} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_coupons-admincouponskpis-kpi-4"/>
    </div>
  );
}
