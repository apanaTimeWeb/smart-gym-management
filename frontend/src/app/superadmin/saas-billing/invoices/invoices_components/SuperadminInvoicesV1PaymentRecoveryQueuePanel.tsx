// RESPONSIBILITY: Renders the Superadmin invoices V1 Payment recovery queue view.
'use client';

import { formatCurrency } from '@/app/superadmin/saas-billing/saas-billing_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminInvoicesV1SectionProps } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesV1Types.ts';
export default function SuperadminInvoicesV1PaymentRecoveryQueuePanel({ data }: SuperadminInvoicesV1SectionProps) {
    const locale = useLocale();

    return <Panel title="Payment recovery queue" description="Every failed payment has a reason, retry count, next step, and age.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Gym
          </th>
          <th className="px-3 py-3">
            Invoice
          </th>
          <th className="px-3 py-3">
            Amount
          </th>
          <th className="px-3 py-3">
            Attempts
          </th>
          <th className="px-3 py-3">
            Next retry
          </th>
          <th className="px-3 py-3">
            Reason
          </th>
        </tr>
      </thead>
      <tbody>
        {data.recovery.map((r) => <tr key={r.invoice} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {r.gym}
          </td>
          <td className="px-3 py-3 text-secondary">
            {r.invoice}
          </td>
          <td className="px-3 py-3 text-primary">
            {formatCurrency(r.amount, r.currency || 'INR', locale)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatNumber(r.attempts)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatDateTime(r.nextRetry)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {r.reason}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
