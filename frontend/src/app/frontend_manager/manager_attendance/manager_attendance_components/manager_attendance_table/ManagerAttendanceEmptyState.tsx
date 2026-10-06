// RESPONSIBILITY: Renders the Manager Attendance entity-specific empty state; the parent table owns data/query state.
'use client';
import { CalendarCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerEmptyState from '@/components/ui/manager_empty_state/ManagerEmptyState';

/** @description Empty-state presentation for an Attendance records table when no rows match the active request. */
/**
 * @description Renders ManagerAttendanceEmptyState, the manager attendance UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerAttendanceEmptyState() {
  const t = useTranslations('MANAGER_ATTENDANCE');
  return <ManagerEmptyState dataTestId="manager_attendance-attendance-empty-state" icon={<CalendarCheck size={18} strokeWidth={2} />} title={t('COPY_NO_ATTENDANCE_RECORDS')} subtitle={t('COPY_THERE_NO_CHECK_INS_DATE_FILTER_YET')} />;
}
