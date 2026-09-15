import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cancellationsAlertsApi } from '@/app/superadmin/cancellations/cancellations_api/superadmin_cancellations_api';
import type { CancellationsAlert, CancellationsFilterStatus, CancellationsActionPayload } from '@/app/superadmin/cancellations/cancellations_types/cancellations_types';

const CANCELLATIONS_PAGE_SIZE = 20;

export function useCancellationsAlertsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<CancellationsFilterStatus>('ALL');
  const [actionAlert, setActionAlert] = useState<CancellationsAlert | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: alertsRes, isLoading: alertsLoading, isError: alertsError } = useQuery({
    queryKey: ['superadmin', 'cancellations'],
    queryFn: () => cancellationsAlertsApi.fetchAlerts(),
  });

  const { data: kpisRes, isLoading: kpisLoading } = useQuery({
    queryKey: ['superadmin', 'cancellations-kpis'],
    queryFn: () => cancellationsAlertsApi.fetchKpis(),
  });

  const updateActionMutation = useMutation({
    mutationFn: (payload: CancellationsActionPayload) => cancellationsAlertsApi.updateAction(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'cancellations'] });
      toast.success(res.message || 'Action updated successfully.', { id: 'cancellations-update-success' });
      setActionAlert(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update action.', { id: 'cancellations-update-error' });
    }
  });

  const bulkOutreachMutation = useMutation({
    mutationFn: (tenantIds: string[]) => cancellationsAlertsApi.bulkOutreach(tenantIds),
    onSuccess: (res) => {
      toast.success(res.message || 'Bulk outreach emails sent!', { id: 'cancellations-bulk-success' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send bulk outreach.', { id: 'cancellations-bulk-error' });
    }
  });

  const alerts: CancellationsAlert[] = alertsRes?.data || [];
  const kpis = kpisRes?.data || { totalAtRisk: 0, criticalCount: 0, highCount: 0, estimatedMrrAtRisk: 0 };

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

  const totalPages = Math.ceil(filtered.length / CANCELLATIONS_PAGE_SIZE) || 1;
  const paginatedAlerts = filtered.slice((currentPage - 1) * CANCELLATIONS_PAGE_SIZE, currentPage * CANCELLATIONS_PAGE_SIZE);
  
  function handleActionConfirm(payload: CancellationsActionPayload) {
    updateActionMutation.mutate(payload);
  }

  function handleBulkOutreach() {
    const atRiskTenants = filtered.filter(a => a.riskLevel === 'CRITICAL' || a.riskLevel === 'HIGH');
    if (atRiskTenants.length === 0) {
      toast.error('No critical/high risk tenants found in current view.', { id: 'cancellations-bulk-empty' });
      return;
    }
    bulkOutreachMutation.mutate(atRiskTenants.map(a => a.tenantId));
  }

  const isFiltered = search !== '' || activeFilter !== 'ALL';

  return {
    search, setSearch,
    activeFilter, setActiveFilter,
    actionAlert, setActionAlert,
    currentPage, setCurrentPage,
    alertsLoading, kpisLoading, alertsError,
    kpis, filtered, paginatedAlerts, totalPages, isFiltered,
    handleActionConfirm, handleBulkOutreach
  };
}
