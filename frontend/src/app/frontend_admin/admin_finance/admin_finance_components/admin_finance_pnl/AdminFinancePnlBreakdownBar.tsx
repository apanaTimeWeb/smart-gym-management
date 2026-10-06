"use client";
// RESPONSIBILITY: Renders one proportional bar for a P&L breakdown metric.
import { useTranslations } from 'next-intl';

import AdminLayoutProgressBar from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar';
import type { AdminFinancePnlBreakdownBarProps } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinancePnlBreakdownBarPropsTypes';


/**
 * AdminFinancePnlBreakdownBar renders the admin finance pnl breakdown bar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePnlBreakdownBar: Renders one proportional bar for a P&L breakdown metric.
 * @dependencies Consumes AdminLayoutProgressBar, AdminFinancePnlBreakdownBarPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePnlBreakdownBar({ value, max, colorClass }: AdminFinancePnlBreakdownBarProps) {
  const t = useTranslations();
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <AdminLayoutProgressBar
      value={pct}
      variant={colorClass}
      label={t('AdminFinancePnlBreakdownBar.auto_breakdown')}
    />
  );
}
