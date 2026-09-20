// RESPONSIBILITY: Renders the semantic icon for one Superadmin notification severity.
'use client';
import { AlertTriangle, Info } from 'lucide-react';
import type { SuperadminMessagingNotificationIconProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingNotificationIconTypes';
export default function SuperadminMessagingNotificationIcon({ type }: SuperadminMessagingNotificationIconProps) {
  if (type === 'INFO') return <Info size={18} strokeWidth={2} className="shrink-0 text-info"/>;
  if (type === 'WARNING') return <AlertTriangle size={18} strokeWidth={2} className="shrink-0 text-warning"/>;
  return <AlertTriangle size={18} strokeWidth={2} className="shrink-0 text-danger"/>;
}
