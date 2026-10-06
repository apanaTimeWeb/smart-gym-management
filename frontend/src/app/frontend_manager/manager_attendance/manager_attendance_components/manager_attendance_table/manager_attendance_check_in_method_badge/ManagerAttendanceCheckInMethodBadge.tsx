// RESPONSIBILITY: Renders ManagerAttendanceCheckInMethodBadge's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Fingerprint, QrCode, Edit } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CheckInMethod } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';
import type { ReactNode } from 'react';

// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.


/** @description Renders the ManagerAttendanceCheckInMethodBadge component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerAttendanceCheckInMethodBadge({ method }: { method?: CheckInMethod }) {
  const t = useTranslations('MANAGER_ATTENDANCE');

  if (!method) return <span className="text-secondary text-xs">—</span>;
  const config: Record<CheckInMethod, { icon: ReactNode; label: string; class: string }> = {
    QR:        { icon: <QrCode size={18} strokeWidth={2}/>,       label: t("COPY_QR"),       class: 'bg-info text-on-info' },
    Manual:    { icon: <Edit size={18} strokeWidth={2}/>,          label: t("COPY_MANUAL"),   class: 'bg-warning text-on-warning' },
    Biometric: { icon: <Fingerprint size={18} strokeWidth={2}/>,   label: t("COPY_BIOMETRIC"), class: 'bg-success text-on-success' } };
  const { icon, label, class: cls } = config[method];
  return (
    <span data-testid={`manager_attendance-attendance-check-in-method-badge-${method.toLowerCase()}`} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {icon}{label}
    </span>
  );
}
