// RESPONSIBILITY: Renders the Superadmin plans V1 Price history, Add-ons, Plan move preview view.
'use client';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminPlansV1SectionProps } from '@/app/superadmin/saas-billing/plans/plans_types/SuperadminPlansV1Types.ts';
export default function SuperadminPlansV1HistoryAddonsAndMigrationSection({ data }: SuperadminPlansV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
  <Panel title="Price history" description="Versioned pricing protects existing tenants from accidental surprise changes.">
    <div className="space-y-3">
      {data.versions.map((v) => <div key={`${v.plan}-${v.version}`} className="rounded-lg border border-border p-3">
        <div className="flex justify-between gap-2">
          <span className="font-medium text-primary">
            {v.plan}
            {v.version}
          </span>
          <span className="text-xs text-secondary">
            {v.effective}
          </span>
        </div>
        <p className="mt-1 text-xs text-secondary">
          {v.change}
        </p>
        <p className="mt-2 text-sm text-primary">
          {formatCurrencyFromMinorUnits(v.monthly)}
          / month
        </p>
      </div>)}
    </div>
  </Panel>
  <Panel title="Add-ons" description="Optional paid capacity without forcing a full plan change.">
    <div className="space-y-3">
      {data.addons.map((a) => <div key={a.name} className="flex items-center justify-between rounded-lg border border-border p-3">
        <span className="truncate text-sm text-primary">
          {a.name}
        </span>
        <span className="text-sm font-medium text-primary">
          {formatCurrencyFromMinorUnits(a.price)}
        </span>
      </div>)}
    </div>
  </Panel>
  <Panel title="Plan move preview" description="Review impact before moving many tenants at once.">
    <div className="space-y-3">
      <div className="rounded-lg bg-input p-3">
        <p className="text-xs text-secondary">
          Move
        </p>
        <p className="mt-1 font-medium text-primary">
          {data.migration.from}
          →
          {data.migration.to}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-secondary">
            Gyms affected
          </p>
          <p className="text-lg font-semibold text-primary">
            {formatNumber(data.migration.tenants)}
          </p>
        </div>
        <div>
          <p className="text-xs text-secondary">
            Monthly change
          </p>
          <p className="text-lg font-semibold text-success">
            +
            {formatCurrencyFromMinorUnits(data.migration.monthlyChange)}
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-warning-bg p-3 text-xs text-warning">
        {data.migration.limitConflicts}
        gyms exceed one or more target limits and need review first.
      </div>
    </div>
  </Panel>
    </div>;
}
