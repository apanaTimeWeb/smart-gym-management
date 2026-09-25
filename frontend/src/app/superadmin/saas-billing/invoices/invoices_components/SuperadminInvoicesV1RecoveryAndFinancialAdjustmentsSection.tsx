// RESPONSIBILITY: Renders the Superadmin invoices V1 Recovery schedule, Refunds, credits & write-offs view.
'use client';

import { formatCurrency } from '@/app/superadmin/saas-billing/saas-billing_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminInvoicesV1SectionProps } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesV1Types.ts';
import { getSuperadminInvoicesStatusBadgeClasses } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesStatusBadgeConfig';
export default function SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection({ data }: SuperadminInvoicesV1SectionProps) {
    const locale = useLocale();

    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title="Recovery schedule" description="Simple timing policy for failed payments.">
    <div className="space-y-2">
      {Object.entries(data.policy).map(([key, value]) => <div key={key} className="flex justify-between rounded-lg border border-border p-3">
        <span className="capitalize text-secondary">
          {key.replace(/([A-Z])/g, ' $1')}
        </span>
        <span className="font-medium text-primary">
          {String(value)}
        </span>
      </div>)}
    </div>
  </Panel>
  <Panel title="Refunds, credits & write-offs" description="Financial adjustments stay visible and reviewable.">
    <div className="space-y-3">
      {data.reconciliation.map((r) => <div key={`${r.type}-${r.gym}`} className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <p className="font-medium text-primary">
            {r.type}
          </p>
          <p className="text-xs text-secondary">
            {r.gym}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-primary">
            {formatCurrency(r.amount, r.currency || 'INR', locale)}
          </p>
          <span className={`text-xs font-semibold ${getSuperadminInvoicesStatusBadgeClasses(r.status)}`}>
            {r.status}
          </span>
        </div>
      </div>)}
    </div>
  </Panel>
    </div>;
}
