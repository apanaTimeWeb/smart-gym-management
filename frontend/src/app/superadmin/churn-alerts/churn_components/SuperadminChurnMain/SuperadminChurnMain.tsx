'use client';
// RESPONSIBILITY: Root client orchestrator for the Churn Alerts page.
// Owns filter state, action modal state, and data. Delegates rendering to child components.

import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import SuperadminChurnKPIs from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnKPIs/SuperadminChurnKPIs';
import SuperadminChurnFilters from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnFilters/SuperadminChurnFilters';
import SuperadminChurnTable from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnTable/SuperadminChurnTable';
import SuperadminChurnEmptyState from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnEmptyState/SuperadminChurnEmptyState';
import SuperadminChurnActionModal from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnActionModal/SuperadminChurnActionModal';
import {
  MOCK_CHURN_ALERTS,
  MOCK_CHURN_KPI,
} from '@/app/superadmin/churn-alerts/churn_utils/churn_constants';
import type { ChurnAlert, ChurnFilterStatus, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

export default function SuperadminChurnMain() {
  const [alerts, setAlerts] = useState<ChurnAlert[]>(MOCK_CHURN_ALERTS);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ChurnFilterStatus>('ALL');
  const [actionAlert, setActionAlert] = useState<ChurnAlert | null>(null);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSearch =
        a.gymName.toLowerCase().includes(search.toLowerCase()) ||
        a.ownerName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === 'ALL' ||
        a.riskLevel === activeFilter ||
        a.actionStatus === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [alerts, search, activeFilter]);

  function handleActionConfirm(payload: ChurnActionPayload) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === payload.alertId
          ? { ...a, actionStatus: payload.status, notes: payload.notes }
          : a
      )
    );
    toast.success('Action updated successfully.');
    setActionAlert(null);
  }

  const isFiltered = search !== '' || activeFilter !== 'ALL';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Churn Alerts</h1>
          <p className="text-secondary mt-1 text-sm">
            Monitor at-risk tenants and take proactive action before they churn.
          </p>
        </div>
      </div>

      <SuperadminChurnKPIs kpis={MOCK_CHURN_KPI} />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <SuperadminChurnFilters
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        {filtered.length === 0 ? (
          <SuperadminChurnEmptyState
            isFiltered={isFiltered}
            onClearFilter={() => { setSearch(''); setActiveFilter('ALL'); }}
          />
        ) : (
          <SuperadminChurnTable
            alerts={filtered}
            onActionClick={setActionAlert}
          />
        )}
      </div>

      {actionAlert && (
        <SuperadminChurnActionModal
          alert={actionAlert}
          onConfirm={handleActionConfirm}
          onClose={() => setActionAlert(null)}
        />
      )}
    </div>
  );
}
