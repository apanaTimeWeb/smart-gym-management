// RESPONSIBILITY: Renders the current filtered tenant dataset and exposes row selection for bulk operations.
'use client';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminGymsV1TenantComparisonPanelProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';

export default function SuperadminGymsV1TenantComparisonPanel({ data, selectedGymIds, onSelectionChange }: SuperadminGymsV1TenantComparisonPanelProps) {
  const selected = new Set(selectedGymIds);
  const allVisibleSelected = data.rows.length > 0 && data.rows.every((row) => selected.has(row.id));
  const toggleAll = () => onSelectionChange(allVisibleSelected ? [] : data.rows.map((row) => row.id));

  return <Panel title="Tenant comparison sample" description="The table is backed by the same filtered V1 response used by bulk actions.">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">Tenant comparison</caption>
        <thead><tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th scope="col" className="px-3 py-3"><input aria-label="Select all visible tenants" type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="h-4 w-4 accent-primary" /></th>
          <th scope="col" className="px-3 py-3">Gym</th><th scope="col" className="px-3 py-3">Region</th><th scope="col" className="px-3 py-3">Plan</th><th scope="col" className="px-3 py-3">Monthly income</th><th scope="col" className="px-3 py-3">Health</th><th scope="col" className="px-3 py-3">Usage</th><th scope="col" className="px-3 py-3">Last action</th>
        </tr></thead>
        <tbody>{data.rows.map((row) => <tr key={row.id} className="border-b border-border hover:bg-surface-hover">
          <td className="px-3 py-3"><input aria-label={`Select ${row.name}`} type="checkbox" checked={selected.has(row.id)} onChange={() => onSelectionChange(selected.has(row.id) ? selectedGymIds.filter((id) => id !== row.id) : [...selectedGymIds, row.id])} className="h-4 w-4 accent-primary" /></td>
          <td className="px-3 py-3"><span className="block max-w-52 truncate font-medium text-primary">{row.name}</span><span className="text-xs text-secondary">{row.status}</span></td>
          <td className="px-3 py-3 text-secondary">{row.region}</td><td className="px-3 py-3 text-secondary">{row.plan}</td><td className="px-3 py-3 text-primary">{formatCurrencyFromMinorUnits(row.income)}</td><td className="px-3 py-3 text-primary">{formatNumber(row.health)}/100</td><td className="px-3 py-3 text-primary">{row.usage}%</td><td className="px-3 py-3 text-secondary">{row.lastAction ?? '—'}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </Panel>;
}
