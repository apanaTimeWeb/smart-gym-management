"use client";
// RESPONSIBILITY: Business logic hook for the Gym Health Alerts module.
// DATA FLOW: API → useAdminGymHealthAlertsLogic → components

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_components/AdminFeedback/AdminToastService';
import { gymHealthAlertsApi } from '@/app/admin/gym-health-alerts/gym_health_alerts_api/AdminGymHealthAlertsApi';
import { useAdminGymHealthAlertsStore } from '@/app/admin/gym-health-alerts/gym_health_alerts_store/useAdminGymHealthAlertsStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { GYM_HEALTH_ITEMS_PER_PAGE } from '@/app/admin/gym-health-alerts/gym_health_alerts_utils/AdminGymHealthAlertsSharedConstants';

export function useAdminGymHealthAlertsLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const {
    severityFilter, setSeverityFilter,
    typeFilter, setTypeFilter,
    gymFilter, setGymFilter,
    resolvedFilter, setResolvedFilter,
    currentPage, setCurrentPage,
  } = useAdminGymHealthAlertsStore();
  useAdminUrlQuerySync([
    { key: 'severity', value: severityFilter, defaultValue: 'all', setValue: useAdminGymHealthAlertsStore.getState().setSeverityFilter },
    { key: 'type', value: typeFilter, defaultValue: 'all', setValue: useAdminGymHealthAlertsStore.getState().setTypeFilter },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: useAdminGymHealthAlertsStore.getState().setGymFilter },
    { key: 'resolved', value: resolvedFilter, defaultValue: 'active', setValue: useAdminGymHealthAlertsStore.getState().setResolvedFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const alertsQuery = useQuery({
    queryKey: ['admin', 'gym-health-alerts', 'alerts'],
    queryFn: () => gymHealthAlertsApi.fetchAlerts().then((r) => r.data || []),
    staleTime: 1000 * 60 * 2,
    refetchInterval: 60000,
  });

  const { data: kpis } = useQuery({
    queryKey: ['admin', 'gym-health-alerts', 'kpis'],
    queryFn: () => gymHealthAlertsApi.fetchKPIs().then((r) => r.data || null),
    staleTime: 1000 * 60 * 5,
  });

  const alerts = alertsQuery.data ?? [];
  const status = alertsQuery.status;

  const filtered = alerts.filter((a) => {
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchType = typeFilter === 'all' || a.alertType === typeFilter;
    const matchGym = gymFilter === 'all' || a.gymId === gymFilter;
    const matchResolved = resolvedFilter === 'all' || (resolvedFilter === 'active' ? !a.isResolved : a.isResolved);
    return matchSeverity && matchType && matchGym && matchResolved;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / GYM_HEALTH_ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * GYM_HEALTH_ITEMS_PER_PAGE, currentPage * GYM_HEALTH_ITEMS_PER_PAGE);

  const resolveMutation = useMutation({
    mutationFn: (id: string) => gymHealthAlertsApi.resolveAlert(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-ef21bd0191'); qc.invalidateQueries({ queryKey: ['admin', 'gym-health-alerts', 'alerts'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-dd598eaa1a'),
  });

  const dismissMutation = useMutation({
    mutationFn: (id: string) => gymHealthAlertsApi.dismissAlert(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-7946fe9ad1'); qc.invalidateQueries({ queryKey: ['admin', 'gym-health-alerts', 'alerts'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-0b8d3968ae'),
  });

  const resolveAlert = useCallback((id: string) => { resolveMutation.mutate(id); }, [resolveMutation]);


  const dismissAlert = useCallback(async (id: string, title: string) => {
    const ok = await confirm({ title: 'Dismiss Alert', message: `Dismiss "${title}"? It will be permanently removed.`, confirmText: 'Dismiss', type: 'warning' });
    if (!ok) return;
    dismissMutation.mutate(id);
  }, [confirm, dismissMutation]);

  return {
    alerts: paginated, allAlerts: filtered, status, kpis,
    severityFilter, setSeverityFilter,
    typeFilter, setTypeFilter,
    gymFilter, setGymFilter,
    resolvedFilter, setResolvedFilter,
    currentPage, setCurrentPage,
    totalPages, totalItems: filtered.length,
    resolveAlert, dismissAlert,
  };
}