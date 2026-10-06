"use client";
// RESPONSIBILITY: Coordinates Gym Health Alerts query state, 60-second refresh, severity/search filters, and pessimistic dismiss behavior.
// DATA FLOW: module API / client state → useAdminGymHealthAlertsLogic → consuming Admin feature component.
import { ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_constants/AdminGymHealthAlertsQueryKeys';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { AdminGymHealthAlertsApi } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_api/AdminGymHealthAlertsApi';
import { useAdminGymHealthAlertsStore } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_store/useAdminGymHealthAlertsStore';
import { useAdminGymHealthAlertsMutations } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_hooks/useAdminGymHealthAlertsMutations';
/**
 * @description useAdminGymHealthAlertsLogic: Coordinates Gym Health Alerts query state, 60-second refresh, severity/search filters, and pessimistic dismiss behavior.
 * @dependencies Consumes AdminGymHealthAlertsQueryKeys, useAdminLayoutConfirm, AdminGymHealthAlertsApi, useAdminGymHealthAlertsStore, useAdminGymHealthAlertsMutations.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminGymHealthAlertsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminLayoutConfirm();
  const { severityFilter, search, setSeverityFilter, setSearch } = useAdminGymHealthAlertsStore();

  const queryParams = { severity: severityFilter === 'all' ? undefined : severityFilter, search: search.trim() || undefined };
  const alertsQuery = useQuery({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('list', queryParams), queryFn: () => AdminGymHealthAlertsApi.fetchAlerts(queryParams), refetchInterval: 60_000, staleTime: 30_000 });
  const summaryQuery = useQuery({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('summary'), queryFn: () => AdminGymHealthAlertsApi.fetchSummary(), staleTime: 60_000 });

  const { dismissMutation, getIntentKey, clearIntentKey } = useAdminGymHealthAlertsMutations();

  const dismissAlert = useCallback(async (id: string, title: string) => {
    const intentId = `dismiss:${id}`;
    const confirmed = await confirm({ title: t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissTitle'), message: t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissMessage', { title }), confirmText: t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return; }
    dismissMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, dismissMutation, getIntentKey]);

  return {
    alerts: alertsQuery.data?.data ?? [],
    kpis: summaryQuery.data?.data ?? null,
    status: alertsQuery.status,
    severityFilter,
    search,
    setSeverityFilter,
    setSearch,
    dismissAlert,
  };
}
