// DATA FLOW: Messaging UI intent → tenant relation lookup → Messaging mutation boundary → API/Query reconciliation → visible state.
// RESPONSIBILITY: Owns send-message and notification-read workflows for the root Messaging view.
'use client';

import toast from 'react-hot-toast';

import { useSuperadminMessaging } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessaging';

import type { SuperadminMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeTypes';

/**
 * @description Owns Messaging action orchestration and server-message feedback outside JSX.
 * @dependencies Uses the feature server-state/mutation hook and module-local composition schema types.
 * @edge-case A missing tenant relation prevents submission; mutation failures remain recoverable and preserve the composing flow.
 */
export function useSuperadminMessagingPageActions(translate: (key: string) => string) {
  const messaging = useSuperadminMessaging();
  const handleSend = async (values: SuperadminMessagingComposeValues) => {
    const tenant = messaging.tenants.find((candidate) => candidate.id === values.tenantId);
    if (!tenant) return false;
    try {
      const response = await messaging.sendMessage({ ...values, tenantName: tenant.name });
      if (!response.success || !response.data) {
        toast.error(response.message, { id: 'superadmin-message-send-error' });
        return false;
      }
      toast.success(response.message, { id: 'superadmin-message-send-success' });
      return true;
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'superadmin-message-send-error' });
      return false;
    }
  };
  const handleMarkRead = async (id: string) => {
    try {
      const response = await messaging.markRead(id);
      toast.success(response.message, { id: `superadmin-notification-read-${id}` });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: `superadmin-notification-read-error-${id}` });
    }
  };
  const handleMarkAllRead = async () => {
    try {
      const response = await messaging.markAllRead();
      toast.success(response.message, { id: 'superadmin-notifications-read-all' });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'superadmin-notifications-read-all-error' });
    }
  };
  return { messaging, handleSend, handleMarkRead, handleMarkAllRead };
}
