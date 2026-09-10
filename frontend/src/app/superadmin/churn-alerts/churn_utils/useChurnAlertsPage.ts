import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { churnAlertsApi } from '@/app/superadmin/churn-alerts/churn_api/superadmin_churn_api';
import type { ChurnAlert, ChurnFilterStatus, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';
import { MOCK_CHURN_ALERTS, MOCK_CHURN_KPI } from '@/app/superadmin/churn-alerts/churn_utils/churn_constants';

const IS_DEV = process.env.NODE_ENV === 'development';
const CHURN_PAGE_SIZE = 20;

export function useChurnAlertsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ChurnFilterStatus>('ALL');
  const [actionAlert, setActionAlert] = useState<ChurnAlert | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: alertsRes, isLoading: alertsLoading, isError: alertsError } = useQuery({
    queryKey: ['superadmin', 'churn-alerts'],
    queryFn: () => churnAlertsApi.fetchAlerts(),
  });

  const { data: kpisRes, isLoading: kpisLoading } = useQuery({
    queryKey: ['superadmin', 'churn-kpis'],
    queryFn: () => churnAlertsApi.fetchKpis(),
  });

  const updateActionMutation = useMutation({
    mutationFn: (payload: ChurnActionPayload) => churnAlertsApi.updateAction(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'churn-alerts'] });
      toast.success(res.message || 'Action updated successfully.', { id: 'churn-update-success' });
      setActionAlert(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update action.', { id: 'churn-update-error' });
    }
  });

  const bulkOutreachMutation = useMutation({
    mutationFn: (tenantIds: string[]) => churnAlertsApi.bulkOutreach(tenantIds),
    onSuccess: (res) => {
      toast.success(res.message || 'Bulk outreach emails sent!', { id: 'churn-bulk-success' });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send bulk outreach.', { id: 'churn-bulk-error' });
    }
  });

  const alerts: ChurnAlert[] = (() => {
    if (alertsRes?.data && alertsRes.data.length > 0) return alertsRes.data;
    return IS_DEV ? MOCK_CHURN_ALERTS : [];
  })();

  const kpis = (() => {
    if (kpisRes?.data) return kpisRes.data;
    return IS_DEV ? MOCK_CHURN_KPI : { totalAtRisk: 0, criticalCount: 0, highCount: 0, estimatedMrrAtRisk: 0 };
  })();

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

  const totalPages = Math.ceil(filtered.length / CHURN_PAGE_SIZE) || 1;
  const paginatedAlerts = filtered.slice((currentPage - 1) * CHURN_PAGE_SIZE, currentPage * CHURN_PAGE_SIZE);
  
  function handleActionConfirm(payload: ChurnActionPayload) {
    updateActionMutation.mutate(payload);
  }

  function handleBulkOutreach() {
    const atRiskTenants = filtered.filter(a => a.riskLevel === 'CRITICAL' || a.riskLevel === 'HIGH');
    if (atRiskTenants.length === 0) {
      toast.error('No critical/high risk tenants found in current view.', { id: 'churn-bulk-empty' });
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
