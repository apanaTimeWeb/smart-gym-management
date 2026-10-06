"use client";

// DATA FLOW: Notification read action → mutation hook → AdminNotificationsApi → TanStack Query invalidation → notification list state.
// RESPONSIBILITY: Owns Admin Notifications read/mark-all mutations, idempotency lifecycle, and cache refresh.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_notifications/admin_notifications_constants/AdminNotificationsQueryKeys';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_notifications/admin_notifications_api/AdminNotificationsApi';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
/**
 * @description useAdminNotificationsMutations: Owns Admin Notifications read/mark-all mutations, idempotency lifecycle, and cache refresh.
 * @dependencies Consumes AdminNotificationsQueryKeys, AdminNotificationsApi, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminNotificationsMutations() {
  const queryClient = useQueryClient();
  const intentKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(intentKeysRef.current, intentId), []);

  const markAsReadMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminNotificationsApi.markNotificationAsRead(id, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey(`mark-read:${variables.id}`);
      adminToast.success(response.message, 'admin-success-0b7060fa');
      await queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key('list') });
    },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin-error-d646d93256'); },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: (idempotencyKey: string) => AdminNotificationsApi.markAllNotificationsAsRead(idempotencyKey),
    onSuccess: async (response) => {
      clearIntentKey('mark-all-read');
      adminToast.success(response.message, 'admin-success-84f4aebf');
      await queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key('list') });
    },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin-error-cfe272030b'); },
  });

  const markAsRead = useCallback((id: string) => {
    const intentId = `mark-read:${id}`;
    markAsReadMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [getIntentKey, markAsReadMutation]);

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate(getIntentKey('mark-all-read'));
  }, [getIntentKey, markAllAsReadMutation]);

  return {
    markAsRead,
    markAllAsRead,
    markAsReadMutation,
    markAllAsReadMutation,
    getIntentKey,
    clearIntentKey,
  };
}
