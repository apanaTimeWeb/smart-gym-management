'use client';
// DATA FLOW: Notification UI intent → stable idempotency key → Messaging API → TanStack Query reconciliation → visible notification state.
// RESPONSIBILITY: Owns notification read mutations and authoritative cache reconciliation for the Superadmin Messaging feature.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingQueryKeys';

import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';
import type { ApiResponse } from '@/lib/api';



type NotificationsQueryData = ApiResponse<SuperadminNotification[]>;

/** Reconciles one authoritative notification response into the existing Query cache without creating a second server-data store. */
function reconcileReadNotification(
  previous: NotificationsQueryData | undefined,
  updated: SuperadminNotification,
): NotificationsQueryData | undefined {
  if (!previous?.data) return previous;
  return {
    ...previous,
    data: previous.data.map((notification) => notification.id === updated.id ? updated : notification),
  };
}

/**
 * @description Executes notification read mutations with stable idempotency keys and updates the feature Query cache from backend responses.
 * @dependencies Requires TanStack Query and the Superadmin Messaging API contract.
 * @edge-case A failed retry reuses the key for the same notification intent; successful completion clears that key so a later new intent receives a new key.
 */
export function useSuperadminMessagingNotificationMutations() {
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getKey = (scope: string) => idempotencyKeysRef.current.get(scope) ?? (() => {
    const key = crypto.randomUUID();
    idempotencyKeysRef.current.set(scope, key);
    return key;
  })();
  const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);

  const markReadMutation = useMutation({
    mutationFn: (id: string) => superadminMessagingApi.markNotificationRead(id, getKey(`read:${id}`)),
    onSuccess: (response, id) => {
      if (!response.success) throw new Error(response.message);
      clearKey(`read:${id}`);
      if (!response.data) return;
      queryClient.setQueryData<NotificationsQueryData>(
        SUPERADMIN_MESSAGING_QUERY_KEYS.notifications,
        (previous) => reconcileReadNotification(previous, response.data as SuperadminNotification),
      );
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.notifications });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => superadminMessagingApi.markAllNotificationsRead(getKey('read-all')),
    onSuccess: (response) => {
      if (!response.success) throw new Error(response.message);
      clearKey('read-all');
      queryClient.setQueryData<NotificationsQueryData>(SUPERADMIN_MESSAGING_QUERY_KEYS.notifications, response);
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.notifications });
    },
  });

  return {
    markRead: markReadMutation.mutateAsync,
    isMarkingRead: markReadMutation.isPending,
    markAllRead: markAllReadMutation.mutateAsync,
    isMarkingAllRead: markAllReadMutation.isPending,
  };
}
