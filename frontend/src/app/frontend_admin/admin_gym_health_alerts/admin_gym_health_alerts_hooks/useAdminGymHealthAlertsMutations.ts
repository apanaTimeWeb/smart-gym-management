"use client";

// DATA FLOW: Alert action → mutation hook → AdminGymHealthAlertsApi → TanStack Query invalidation → alert UI and backend feedback.
// RESPONSIBILITY: Owns the Admin Gym Health Alerts dismiss mutation and cache recovery.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_constants/AdminGymHealthAlertsQueryKeys';
import { AdminGymHealthAlertsApi } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_api/AdminGymHealthAlertsApi';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
/**
 * @description useAdminGymHealthAlertsMutations: Owns the Admin Gym Health Alerts dismiss mutation and cache recovery.
 * @dependencies Consumes AdminGymHealthAlertsQueryKeys, AdminGymHealthAlertsApi, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminGymHealthAlertsMutations() {
  const queryClient = useQueryClient();
  const intentKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const dismissMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminGymHealthAlertsApi.dismissAlert(id, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey(`dismiss:${variables.id}`);
      await queryClient.invalidateQueries({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('list') });
      await queryClient.invalidateQueries({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('summary') });
      adminToast.success(response.message, `admin-gym-health-alert-dismiss-${variables.id}`);
    },
    onError: (error, variables) => { clearIntentKey(`dismiss:${variables.id}`); void queryClient.invalidateQueries({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('list') }); const message = getAdminBackendMessage(error); if (message) adminToast.error(message, `admin-gym-health-alert-dismiss-error-${variables.id}`); },
  });
  return { dismissMutation, getIntentKey, clearIntentKey };
}
