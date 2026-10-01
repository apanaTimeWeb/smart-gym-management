'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { useSuperadminMessaging } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessaging';
import { useSuperadminMessagingCompose } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingCompose';

import type { SuperadminMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeTypes';

/**
 * @description Owns messaging page UI state plus mutation feedback orchestration for the Main view.
 * @dependencies Delegates server data and mutations to the feature messaging hook and compose payload hook.
 * @edge-case Toasts use stable IDs so repeated failures/successes do not stack; modal closes only after authoritative success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminMessagingMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin messaging main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminMessagingMainViewModel() {
  const t = useTranslations('superadmin_messaging');
  const messaging = useSuperadminMessaging();
  const [composeOpen, setComposeOpen] = useState(false);
  const resolveComposePayload = useSuperadminMessagingCompose(messaging.tenants);

  const handleSend = async (values: SuperadminMessagingComposeValues): Promise<void> => {
    const payload = resolveComposePayload(values);
    if (!payload) return;

    try {
      const response = await messaging.sendMessage(payload);
      if (!response.success || !response.data) {
        toast.error(response.message, { id: 'superadmin-message-send-error' });
        return;
      }
      toast.success(response.message, { id: 'superadmin-message-send-success' });
      setComposeOpen(false);
    } catch {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-message-send-error' });
    }
  };

  const handleMarkRead = async (id: string): Promise<void> => {
    try {
      const response = await messaging.markRead(id);
      toast.success(response.message, { id: `superadmin-notification-read-${id}` });
    } catch {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-notification-read-error' });
    }
  };

  const handleMarkAllRead = async (): Promise<void> => {
    try {
      const response = await messaging.markAllRead();
      toast.success(response.message, { id: 'superadmin-notifications-read-all' });
    } catch {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-notifications-read-all-error' });
    }
  };

  return {
    ...messaging,
    composeOpen,
    openCompose: () => setComposeOpen(true),
    closeCompose: () => setComposeOpen(false),
    handleSend,
    handleMarkRead,
    handleMarkAllRead,
  };
}
