'use client';
// RESPONSIBILITY: Renders the semantic icon for one Superadmin notification severity.
import { AlertTriangle, Info } from 'lucide-react';

import { SUPERADMIN_MESSAGING_NOTIFICATION_TYPE_CODES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';

import type { SuperadminMessagingNotificationIconProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingNotificationIconTypes';



/**
 * @description Renders the semantic icon for one Superadmin notification severity.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingNotificationIcon({ type }: SuperadminMessagingNotificationIconProps) {
  if (type === SUPERADMIN_MESSAGING_NOTIFICATION_TYPE_CODES.INFO) return <Info size={18} strokeWidth={2} className="shrink-0 text-info"/>;
  if (type === SUPERADMIN_MESSAGING_NOTIFICATION_TYPE_CODES.WARNING) return <AlertTriangle size={18} strokeWidth={2} className="shrink-0 text-warning"/>;
  return <AlertTriangle size={18} strokeWidth={2} className="shrink-0 text-danger"/>;
}
