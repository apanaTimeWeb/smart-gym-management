// RESPONSIBILITY: Renders the Superadmin invoices V1 Recovery schedule, Refunds, credits & write-offs view.
'use client';
import { formatCurrency, formatNumber, formatDateTime } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminInvoicesV1SectionProps } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesV1Types.ts';
import { getSuperadminStatusBadgeClasses } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminStatusBadgeConfig';
export default function SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection({ data }: SuperadminInvoicesV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Recovery schedule" description="Simple timing policy for failed payments.">
    <div className="space-y-2">
      {Object.entries(data.policy).map(([key, value]) => <div key={key} className="flex justify-between rounded-lg border border-border p-3">
        <span className="capitalize text-secondary">
          {key.replace(/([A-Z])/g, ' $1')}
        </span>
        <span className="font-medium text-foreground">
          {String(value)}
        </span>
      </div>)}
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Refunds, credits & write-offs" description="Financial adjustments stay visible and reviewable.">
    <div className="space-y-3">
      {data.reconciliation.map((r) => <div key={`${r.type}-${r.gym}`} className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <p className="font-medium text-foreground">
            {r.type}
          </p>
          <p className="text-xs text-secondary">
            {r.gym}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium text-foreground">
            {formatCurrency(r.amount)}
          </p>
          <span className={`text-xs font-semibold ${getSuperadminStatusBadgeClasses(r.status)}`}>
            {r.status}
          </span>
        </div>
      </div>)}
    </div>
  </SuperadminV1Panel>
    </div>;
}
