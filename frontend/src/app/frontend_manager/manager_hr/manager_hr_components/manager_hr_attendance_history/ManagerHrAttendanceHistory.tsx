// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MANAGER_HR_STATUS_VALUES, MANAGER_HR_STATUS_PRESENT } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrConstants';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { useManagerHrStaffAttendanceQuery } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrStaffAttendanceQuery';
import { ManagerHrFormatDate, ManagerHrDisplayValue } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import type { ManagerHrStaffAttendanceRecord } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrStaffAttendanceTypes';


/**
 * @description Renders/orchestrates the ManagerHrAttendanceHistory user interface for the hr module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters; @/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic; @/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrStaffAttendanceQuery; @/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown; @/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrStaffAttendanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const ATTENDANCE_COLUMN_COUNT = 4;

/**
 * @description Provides the `getCurrentMonth` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

/**
 * @description Provides the `getStatusClass` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function getStatusClass(status: string) {
  if (status === MANAGER_HR_STATUS_PRESENT) return 'bg-success-bg text-success border-success';
  if (status === MANAGER_HR_STATUS_VALUES.ABSENT) return 'bg-danger-bg text-danger border-danger';
  return 'bg-warning-bg text-warning border-warning';
}

/** @description Renders the ManagerHrAttendanceHistory component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (6 documented module/import dependencies).. @edge-case Preserves loading state, error state. */
export default function ManagerHrAttendanceHistory() {
  const t = useTranslations('MANAGER_HR');

  const { staff } = useManagerHrLogic();
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [month, setMonth] = useState(getCurrentMonth);


  const effectiveStaffId = selectedStaffId || staff[0]?.id || '';
  const { data, isPending, isError, error } = useManagerHrStaffAttendanceQuery(effectiveStaffId, month);
  const history: ManagerHrStaffAttendanceRecord[] = data?.data?.history ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <div>
          <h2 className="text-lg font-bold text-primary">{t("COPY_TRAINER_ATTENDANCE_HISTORY")}</h2>
          <p className="text-sm text-secondary">{t("COPY_READ_ONLY_ATTENDANCE_RECORDS_SUPPLIED_MANAGER_HR_ATTENDANCE_API")}</p>
        </div>
        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          <div className="min-w-56">
            <label className="mb-1 block text-xs text-secondary" htmlFor="manager-hr-attendance-staff">{t("COPY_STAFF_MEMBER_3")}</label>
            <ManagerSearchableDropdown dataTestId="manager_hr-managerhrattendancehistory-managersearchabledropdown-1"
              value={effectiveStaffId}
              onChange={(value) => setSelectedStaffId(String(value))}
              options={staff.map((member) => ({ value: member.id, label: `${member.name} (${member.role})` }))}
              placeholder={t("COPY_SELECT_STAFF_1")}
             data-testid="manager_hr-managerhrattendancehistory-searchable-dropdown-1"/>
          </div>
          <div>
            <label className="mb-1 block text-xs text-secondary" htmlFor="manager-hr-attendance-month">{t("COPY_MONTH_2")}</label>
            <input data-testid="manager_hr-manager-hr-attendance-history-manager-hr-attendance-month" id="manager-hr-attendance-month" type="month" value={month} onChange={(event) => setMonth(event.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-highlight">
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">{t("COPY_DATE_2")}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">{t("COPY_STATUS_2")}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">{t("COPY_CHECK")}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">{t("COPY_CHECK_OUT")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {(() => { if (isPending) { return (
              [1, 2, 3, 4, 5].map((skeletonRow) => (
                <tr key={`attendance-loading-row-${skeletonRow}`} className="motion-safe:animate-pulse">
                  {Array.from({ length: ATTENDANCE_COLUMN_COUNT }, (_, cellIndex) => (
                    <td key={`attendance-loading-row-${skeletonRow}-cell-${cellIndex + 1}`} className="p-4"><div className="h-4 w-24 rounded bg-input" /></td>
                  ))}
                </tr>
              ))
            ); } return (() => { if (isError) { return (
              <tr><td colSpan={ATTENDANCE_COLUMN_COUNT} className="p-10 text-center text-danger">{error instanceof Error ? error.message : t("TEXT_GENERIC_ERROR")}</td></tr>
            ); } return (() => { if (history.length === 0) { return (
              <tr><td colSpan={ATTENDANCE_COLUMN_COUNT} className="p-10 text-center text-secondary"><CalendarDays size={18} strokeWidth={2} aria-hidden="true" className="mx-auto mb-2 opacity-40"  data-testid="manager_hr-managerhrattendancehistory-interactive"/>{t("COPY_NO_ATTENDANCE_RECORDS_WERE_RETURNED_SELECTED_MONTH")}</td></tr>
            ); } return (
              history.map((record) => (
                <tr key={`${record.date}-${record.status}`}>
                  <td className="p-4 text-primary">{ManagerHrFormatDate(record.date)}</td>
                  <td className="p-4"><span data-testid={`manager_hr-manager-hr-attendance-history-status-${record.date}-${record.status}`} className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(record.status)}`}>{ManagerHrDisplayValue(record.status)}</span></td>
                  <td className="p-4 text-secondary">{ManagerHrDisplayValue(record.checkIn)}</td>
                  <td className="p-4 text-secondary">{ManagerHrDisplayValue(record.checkOut)}</td>
                </tr>
              ))
            ); })(); })(); })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
