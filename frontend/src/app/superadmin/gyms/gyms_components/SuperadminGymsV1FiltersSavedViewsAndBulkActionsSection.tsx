// RESPONSIBILITY: Renders executable tenant filters, saved views, tenant selection, and bulk actions for the V1 controls feature.
'use client';

import { useState } from 'react';
import { Filter, UsersRound, Download } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import { SUPERADMIN_GYMS_V1_PLAN_OPTIONS } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsV1Constants';
import type { SuperadminGymsV1FiltersSavedViewsAndBulkActionsSectionProps, SuperadminGymsV1BulkAction } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';

export default function SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection({
  data,
  selectedFilterKey,
  selectedGymIds,
  onFilterChange,
  onSavedViewChange,
  onSelectionChange,
  onBulkAction,
  isBulkPending,
}: SuperadminGymsV1FiltersSavedViewsAndBulkActionsSectionProps) {
  const [pendingAction, setPendingAction] = useState<SuperadminGymsV1BulkAction | ''>('');
  const [targetPlan, setTargetPlan] = useState<string>(SUPERADMIN_GYMS_V1_PLAN_OPTIONS[0]);
  const selectedSet = new Set(selectedGymIds);
  const selectableRows = data.rows;

  const toggleSelection = (gymId: string) => {
    onSelectionChange(selectedSet.has(gymId) ? selectedGymIds.filter((id) => id !== gymId) : [...selectedGymIds, gymId]);
  };

  const handleBulkAction = async () => {
    if (!pendingAction || selectedGymIds.length === 0) return;
    if (pendingAction === 'Export selected') {
      const selectedRows = selectableRows.filter((row) => selectedSet.has(row.id));
      const csv = ['Gym,Status,Region,Plan,Income,Health,Usage', ...selectedRows.map((row) => [row.name, row.status, row.region, row.plan, row.income, row.health, row.usage].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))].join('\n');
      const href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = href;
      link.download = 'superadmin-selected-tenants.csv';
      link.click();
      URL.revokeObjectURL(href);
      setPendingAction('');
      onSelectionChange([]);
      return;
    }
    await onBulkAction(pendingAction, selectedGymIds, pendingAction === 'Move plan' ? targetPlan : undefined);
    setPendingAction('');
    onSelectionChange([]);
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Panel title="Advanced tenant filters" description="Apply a real filter to the tenant dataset returned by the module API.">
        <div className="grid grid-cols-2 gap-2">
          {data.filters.map((filter) => (
            <button key={filter.key} type="button" aria-pressed={selectedFilterKey === filter.key} onClick={() => onFilterChange(filter.key)} className={`min-h-11 rounded-md border px-3 py-2 text-left text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ${selectedFilterKey === filter.key ? 'border-primary bg-primary-subtle text-primary' : 'border-border bg-input text-primary'}`}>
              {filter.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-secondary" role="status">Showing {data.rows.length} tenant records for this filter.</p>
      </Panel>

      <Panel title="Saved views" description="Saved views apply the same server-backed filter definitions as the filter controls.">
        <div className="space-y-2">
          {data.saved.map((view) => (
            <button key={view.key} type="button" onClick={() => onSavedViewChange(view.key)} className={`flex min-h-11 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selectedFilterKey === view.key ? 'border-primary bg-primary-subtle text-primary' : 'border-border text-primary'}`}>
              <span className="truncate">{view.label}</span><Filter size={18} aria-hidden="true" className="text-primary"/>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Bulk actions" description="Select visible tenants, choose an action, and apply it through the module-owned mutation.">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-secondary">{selectedGymIds.length} selected</span>
            <button type="button" onClick={() => onSelectionChange(selectableRows.map((row) => row.id))} disabled={selectableRows.length === 0 || isBulkPending} className="min-h-11 px-2 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Select visible</button>
          </div>
          <div className="space-y-2" aria-label="Tenant selection">
            {selectableRows.map((row) => (
              <label key={row.id} className="flex min-h-11 items-center gap-3 rounded-md border border-border px-3 py-2 text-sm text-primary">
                <input type="checkbox" checked={selectedSet.has(row.id)} onChange={() => toggleSelection(row.id)} className="h-4 w-4 accent-primary" />
                <span className="truncate">{row.name}</span>
                <span className="ml-auto text-xs text-secondary">{row.status}</span>
              </label>
            ))}
          </div>
          <select value={pendingAction} onChange={(event) => setPendingAction(event.target.value as SuperadminGymsV1BulkAction | '')} disabled={isBulkPending} className="min-h-11 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="">Choose bulk action</option>
            {data.bulk.map((action) => <option key={action} value={action}>{action}</option>)}
          </select>
          {pendingAction === 'Move plan' ? <select value={targetPlan} onChange={(event) => setTargetPlan(event.target.value)} className="min-h-11 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{SUPERADMIN_GYMS_V1_PLAN_OPTIONS.map((plan) => <option key={plan} value={plan}>{plan}</option>)}</select> : null}
          <button type="button" onClick={() => void handleBulkAction()} disabled={!pendingAction || selectedGymIds.length === 0 || isBulkPending} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
            {pendingAction === 'Export selected' ? <Download size={18} aria-hidden="true"/> : <UsersRound size={18} aria-hidden="true"/>}
            {isBulkPending ? 'Applying…' : 'Apply action'}
          </button>
        </div>
      </Panel>
    </div>
  );
}
