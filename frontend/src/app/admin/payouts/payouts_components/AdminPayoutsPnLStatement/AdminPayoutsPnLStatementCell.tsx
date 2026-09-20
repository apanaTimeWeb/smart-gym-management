"use client";
// RESPONSIBILITY: Renders one formatted monetary cell in the payouts P&L statement.
import { formatCurrency } from '@/lib/formatters';

import type { AdminPayoutsPnLStatementCellProps } from '@/app/admin/payouts/payouts_types/AdminPayoutsPnLStatementCellPropsTypes';


export default function AdminPayoutsPnLStatementCell({ value, tone = 'text-primary' }: AdminPayoutsPnLStatementCellProps) {
  return <td className={`px-4 py-3 text-sm ${tone}`}>{formatCurrency(value)}</td>;
}
