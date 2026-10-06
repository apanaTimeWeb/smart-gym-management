// RESPONSIBILITY: Renders one formatted monetary cell in the payouts P&L statement.
"use client";
import { useLocale } from 'next-intl';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_payouts/admin_payouts_utils/AdminPayoutsFormatCurrency';


import type { AdminPayoutsPnLStatementCellProps } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsPnLStatementCellPropsTypes';


/**
 * AdminPayoutsPnLStatementCell renders the admin payouts pn lstatement cell UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsPnLStatementCell: Renders one formatted monetary cell in the payouts P&L statement.
 * @dependencies Consumes AdminPayoutsFormatCurrency, AdminPayoutsPnLStatementCellPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsPnLStatementCell({ value, tone = 'text-primary' }: AdminPayoutsPnLStatementCellProps) {
  const locale = useLocale();
  return <td className={`px-4 py-3 text-sm ${tone}`}>{AdminPayoutsFormatCurrency(value, undefined, locale)}</td>;
}
