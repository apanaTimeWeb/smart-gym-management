// DATA FLOW: Inputs enter useSuperadminMessagingNotificationMutations, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns notification read mutations and reconciles the feature-owned notification query.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse } from '@/lib/api';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/SuperadminMessagingApi';
import type { SuperadminNotification } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';

const NOTIFICATION_QUERY_KEY = ['superadmin', 'messaging', 'notifications'] as const;
type NotificationsQueryData = ApiResponse<SuperadminNotification[]>;

/**
 * Updates one notification in the cached notification list after the read mutation succeeds.
 * Keeps the server-state cache as the sole source of truth and avoids a broad refetch.
 */
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

/** Purpose: Owns the useSuperadminMessagingNotificationMutations data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
export function useSuperadminMessagingNotificationMutations() {
  const queryClient = useQueryClient();
  const markReadMutation = useMutation({
    mutationFn: (id: string) => superadminMessagingApi.markNotificationRead(id),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.setQueryData<NotificationsQueryData>(
        NOTIFICATION_QUERY_KEY,
        (previous) => reconcileReadNotification(previous, response.data!),
      );
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => superadminMessagingApi.markAllNotificationsRead(),
    onSuccess: (response) => {
      queryClient.setQueryData<NotificationsQueryData>(NOTIFICATION_QUERY_KEY, response);
    },
  });

  return {
    markRead: markReadMutation.mutateAsync,
    isMarkingRead: markReadMutation.isPending,
    markAllRead: markAllReadMutation.mutateAsync,
    isMarkingAllRead: markAllReadMutation.isPending,
  };
}
