'use client';
import { useRef } from 'react';
// DATA FLOW: User action → ManagerNotificationsMutations → ManagerNotificationsApi → TanStack Query invalidation → Notifications UI.

import { useCallback } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { ManagerNotificationsApi } from '@/app/frontend_manager/manager_notifications/manager_notifications_api/ManagerNotificationsApi';
import { ManagerNotificationsQueryKeys } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsQueryKeys';
import { MANAGER_NOTIFICATION_DELETE_ACTION } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsSharedConstants';
import { useTranslations } from 'next-intl';

/**
 * @description Owns notification read/delete mutations, confirmation, idempotency lifecycle, and cache invalidation for user-triggered notification actions.
 * @dependencies Uses ManagerNotificationsApi, ManagerNotificationsQueryKeys, confirmation/toast infrastructure, and module translations.
 * @edge-case Destructive deletion is confirmed before key generation; failed requests retain the existing cache and expose the backend error through the approved toast layer.
 */
export function useManagerNotificationsMutations() {
  const t = useTranslations('MANAGER_NOTIFICATIONS');
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();
  const intentKeysRef = useRef(new Map<string, string>());
  const invalidate = useCallback(() => queryClient.invalidateQueries({ queryKey: ManagerNotificationsQueryKeys.all }), [queryClient]);

  const readMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerNotificationsApi.markNotificationRead(id, idempotencyKey),
    onSuccess: (response, id) => { showManagerSuccessToast(response.message, `manager-notifications-mark-read-${id}`); void invalidate(); },
    onError: (error, id) => { showManagerErrorToast(error, `manager-notifications-mark-read-${id}`); },
  });
  const readAllMutation = useMutation({
    mutationFn: ({ idempotencyKey }: { idempotencyKey: string }) => ManagerNotificationsApi.markAllNotificationsRead(idempotencyKey),
    onSuccess: (response) => { showManagerSuccessToast(response.message, 'manager-notifications-mark-all-read'); void invalidate(); },
    onError: (error) => { showManagerErrorToast(error, 'manager-notifications-mark-all-read'); },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerNotificationsApi.deleteNotification(id, idempotencyKey),
    onSuccess: (response, id) => { showManagerSuccessToast(response.message, `manager-notifications-delete-${id}`); void invalidate(); },
    onError: (error, id) => { showManagerErrorToast(error, `manager-notifications-delete-${id}`); },
  });

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = await confirm({
      title: t('DELETE_NOTIFICATION_TITLE'),
      message: t('DELETE_NOTIFICATION_MESSAGE'),
      confirmText: t(MANAGER_NOTIFICATION_DELETE_ACTION),
      cancelText: t('KEEP_NOTIFICATION'),
      type: 'danger',
    });
    if (confirmed) { const idempotencyKey = intentKeysRef.current.get(`delete:${id}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`delete:${id}`, idempotencyKey); await deleteMutation.mutateAsync({ id, idempotencyKey }); }
  }, [confirm, deleteMutation, t]);

  const handleMarkRead = useCallback(async (id: string) => {
    const idempotencyKey = intentKeysRef.current.get(`read:${id}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`read:${id}`, idempotencyKey); await readMutation.mutateAsync({ id, idempotencyKey });
  }, [readMutation]);

  const handleMarkAllRead = useCallback(async () => {
    const idempotencyKey = intentKeysRef.current.get('read-all') ?? createManagerIdempotencyKey(); intentKeysRef.current.set('read-all', idempotencyKey); await readAllMutation.mutateAsync({ idempotencyKey });
  }, [readAllMutation]);

  return {
    handleMarkRead,
    handleMarkAllRead,
    handleDelete,
    saving: readMutation.isPending || readAllMutation.isPending || deleteMutation.isPending,
  };
}
