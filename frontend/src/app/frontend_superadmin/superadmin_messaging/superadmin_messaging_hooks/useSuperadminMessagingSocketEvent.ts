'use client';// DATA FLOW: SuperadminLayoutSocketProvider → useSuperadminMessagingSocketEvent → messaging event callback → TanStack Query invalidation → refreshed UI.
// RESPONSIBILITY: Subscribes the Superadmin Messaging feature to notification WebSocket events through role infrastructure and triggers authoritative recovery fetches.
import { useEffect } from 'react';

import { useSuperadminSocket } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutSocketProvider';



/**
 * @description Connects Messaging to role-level socket events without creating a WebSocket inside the feature.
 * @dependencies Requires the SuperadminLayoutSocketProvider and a stable recovery callback from the Messaging query layer.
 * @edge-case Malformed or unrelated socket payloads are ignored; connection loss is recovered by visibility/focus/refetch logic in the caller.
 */
export function useSuperadminMessagingSocketEvent(onNotificationEvent: () => void): void {
  const { subscribe } = useSuperadminSocket();
  // EFFECT INTENT: Subscribe/unsubscribe to the role-owned Socket.IO event for the lifetime of the feature hook.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
useEffect(() => subscribe('notification.received', onNotificationEvent), [subscribe, onNotificationEvent]);
// EFFECT INTENT: Keeps the subscription lifecycle aligned with the active module event name and callback identity.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => subscribe('chat_message', onNotificationEvent), [subscribe, onNotificationEvent]);
}
