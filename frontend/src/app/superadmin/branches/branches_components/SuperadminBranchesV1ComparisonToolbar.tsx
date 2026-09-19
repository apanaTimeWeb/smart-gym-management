// RESPONSIBILITY: Renders URL-backed period/filter controls for the Superadmin branch comparison dataset.
'use client';
import { Filter } from 'lucide-react';
import type { SuperadminBranchesV1ComparisonToolbarProps } from '@/app/superadmin/branches/branches_types/SuperadminBranchesV1Types';

export default function SuperadminBranchesV1ComparisonToolbar({ data, selectedPeriodKey, selectedFilterKey, onPeriodChange, onFilterChange }: SuperadminBranchesV1ComparisonToolbarProps) {
  return <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
    <div><p className="font-medium text-primary">Compare branch performance</p><p className="text-xs text-secondary">These controls change the server-backed comparison dataset.</p></div>
    <div className="flex flex-wrap gap-2">
      {data.periods.map((period) => <button key={period.key} type="button" aria-pressed={selectedPeriodKey === period.key} onClick={() => onPeriodChange(period.key)} className={`min-h-11 rounded-md border px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selectedPeriodKey === period.key ? 'border-primary bg-primary-subtle text-primary' : 'border-border text-primary'}`}>{period.label}</button>)}
      {data.filters.slice(0, 4).map((filter) => <button key={filter.key} type="button" aria-pressed={selectedFilterKey === filter.key} onClick={() => onFilterChange(filter.key)} className={`min-h-11 rounded-md border px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selectedFilterKey === filter.key ? 'border-primary bg-primary-subtle text-primary' : 'border-border text-primary'}`}><Filter size={18} className="mr-1 inline" aria-hidden="true" />{filter.label}</button>)}
      <span className="sr-only" role="status">Selected period {selectedPeriodKey}; selected filter {selectedFilterKey}; {data.branches.length} branches shown.</span>
    </div>
  </div>;
}
