// RESPONSIBILITY: Renders the ManagerAttendanceCheckInMethodBadge sub-view extracted from ManagerAttendanceTable; owns only this presentation responsibility.
'use client';
import { Clock, Calendar, CalendarCheck, Fingerprint, QrCode, Edit } from 'lucide-react';
import type { CheckInMethod } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { ReactNode } from 'react';

// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.


export function ManagerAttendanceCheckInMethodBadge({ method }: { method?: CheckInMethod }) {
  if (!method) return <span className="text-secondary text-xs">—</span>;
  const config: Record<CheckInMethod, { icon: ReactNode; label: string; class: string }> = {
    QR:        { icon: <QrCode size={18} />,       label: 'QR',       class: 'bg-info text-on-info' },
    Manual:    { icon: <Edit size={18} />,          label: 'Manual',   class: 'bg-warning text-on-primary' },
    Biometric: { icon: <Fingerprint size={18} />,   label: 'Biometric', class: 'bg-success text-on-success' } };
  const { icon, label, class: cls } = config[method];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {icon}{label}
    </span>
  );
}
