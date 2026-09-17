'use client';
import { AlertTriangle, Info, CheckCircle, Bell } from 'lucide-react';
import type { SuperadminNotification } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

interface SuperadminNotificationTypeIconProps {
  type: SuperadminNotification['type'];
}

export default function SuperadminNotificationTypeIcon({ type }: SuperadminNotificationTypeIconProps) {
  switch (type) {
    case 'INFO':
      return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500"><Info size={16} /></div>;
    case 'WARNING':
      return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"><AlertTriangle size={16} /></div>;
    case 'CRITICAL':
      return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500"><AlertTriangle size={16} /></div>;
    default:
      return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/10 text-gray-500"><Bell size={16} /></div>;
  }
}
