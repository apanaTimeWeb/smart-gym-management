'use client';
// RESPONSIBILITY: Renders the status icon for a shell notification without owning notification data or network logic.
import { AlertTriangle, Info } from 'lucide-react';
import type { SuperadminShellNotificationIconProps, SuperadminShellNotificationType } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationTypes';

export default function SuperadminShellNotificationIcon({ type }: SuperadminShellNotificationIconProps) {
  if (type === 'INFO') return <Info size={18} strokeWidth={2} className="shrink-0 text-info" aria-hidden="true" />;
  if (type === 'WARNING') return <AlertTriangle size={18} strokeWidth={2} className="shrink-0 text-warning" aria-hidden="true" />;
  return <AlertTriangle size={18} strokeWidth={2} className="shrink-0 text-danger" aria-hidden="true" />;
}
