// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Clock, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ManagerAttendanceCheckInMethodBadge } from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_table/manager_attendance_check_in_method_badge/ManagerAttendanceCheckInMethodBadge';
import ManagerAttendanceEmptyState from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_table/ManagerAttendanceEmptyState';
import { MANAGER_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceConstants';
import { ATTENDANCE_TABLE_HEADERS, formatTime } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceSharedConstants';
import { useManagerAttendanceLogic } from '@/app/frontend_manager/manager_attendance/manager_attendance_hooks/useManagerAttendanceLogic';
import { ManagerAttendanceDisplayValue, ManagerAttendanceFormatDate } from '@/app/frontend_manager/manager_attendance/manager_attendance_utils/ManagerAttendanceFormatters';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import type { ManagerAttendancePersonType } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';

// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.



/** Formats durationMinutes into a readable "Xh Ym" string. */
/**
 * @description Provides the `formatDuration` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function getAttendanceTypeSurface(type: ManagerAttendancePersonType): string {
  if (type === 'MEMBER') return 'bg-info-bg';
  return 'bg-success-bg';
}

function getAttendanceTypeBadgeSurface(type: ManagerAttendancePersonType): string {
  if (type === 'MEMBER') return 'bg-info text-on-info';
  return 'bg-success text-on-success';
}

function isAttendancePresent(checkIn: string | undefined, status: string | undefined, type: ManagerAttendancePersonType): boolean {
  return Boolean(checkIn) || status === MANAGER_ATTENDANCE_STATUS_VALUES.PRESENT || type === 'MEMBER';
}

function getAttendanceStatusSurface(isPresent: boolean): string {
  return isPresent ? 'bg-success text-on-success' : 'bg-danger text-on-danger';
}

function getAttendanceStatusLabel(isPresent: boolean, t: (key: string) => string): string {
  return isPresent ? t('COPY_PRESENT_3') : t('COPY_ABSENT_2');
}

/** @description Renders the ManagerAttendanceTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerAttendanceTable() {
  const t = useTranslations('MANAGER_ATTENDANCE');

  const { records, totalRecords, isPending, isError, errorMessage, currentPage, setCurrentPage, setCalendarUser } = useManagerAttendanceLogic();

  const totalPages = Math.max(1, Math.ceil(totalRecords / MANAGER_ITEMS_PER_PAGE));
  const paginatedRecords = records;

  return (
    <div className="p-5">
      {(() => { if (isPending) return (<div className="motion-safe:animate-pulse bg-card rounded-xl border border-border mt-4 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          {[...Array(5)].map((_, i) => (<div key={`skeleton-${i}`} className="h-16 border-b border-border flex items-center px-4 gap-4">
              <div className="h-8 w-8 bg-input rounded-full"></div>
              <div className="h-4 bg-input rounded w-32"></div>
              <div className="h-4 bg-input rounded-full w-16"></div>
              <div className="h-4 bg-input rounded w-20"></div>
              <div className="h-4 bg-input rounded w-20"></div>
              <div className="h-4 bg-input rounded w-16"></div>
              <div className="h-4 bg-input rounded w-16"></div>
            </div>))}
        </div>); return (() => { if (isError) return (<div className="text-center py-16 bg-card rounded-2xl border border-danger mt-4 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <p className="text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
          <span className="text-sm text-secondary">{t("COPY_RETRY_REQUEST")}</span>
        </div>); return (<div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-input">
              <tr>
                {ATTENDANCE_TABLE_HEADERS.map(h => (<th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedRecords.map((r, mapIndex) => (<tr data-testid={`manager_attendance-attendance-attendancetable-row-${r.id}`} key={r.id} tabIndex={0} role="button" aria-label={t("TEXT_VIEW_ATTENDANCE_HISTORY", { value: r.member?.name || r.staff?.name || t("TEXT_RECORD_FALLBACK") })} onClick={() => setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendancePersonType })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendancePersonType });
    } }} className="cursor-pointer hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
                  {/* Name */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-primary text-xs font-bold ${getAttendanceTypeSurface(r.type as ManagerAttendancePersonType)}`}>
                        {(r.member?.name || r.staff?.name || '?').charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {ManagerAttendanceDisplayValue(r.member?.name ?? r.staff?.name)}
                      </span>
                    </div>
                  </td>
                  {/* Type */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${getAttendanceTypeBadgeSurface(r.type as ManagerAttendancePersonType)}`}>
                      {r.type}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${getAttendanceStatusSurface(isAttendancePresent(r.checkIn, r.status, r.type as ManagerAttendancePersonType))}`}>
                      {getAttendanceStatusLabel(isAttendancePresent(r.checkIn, r.status, r.type as ManagerAttendancePersonType), t)}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{ManagerAttendanceFormatDate(r.date)}</td>
                  {/* Check In */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock size={18} strokeWidth={2} className="opacity-50"/>
                      {formatTime(r.checkIn)}
                    </div>
                  </td>
                  {/* Check Out — CRITICAL FIX */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock size={18} strokeWidth={2} className="opacity-50"/>
                      {formatTime(r.checkOut ?? r.checkOutTime)}
                    </div>
                  </td>
                  {/* Duration — CRITICAL FIX */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    {formatDuration(r.durationMinutes)}
                  </td>
                  {/* Method — CRITICAL FIX */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <ManagerAttendanceCheckInMethodBadge method={r.checkInMethod}/>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-md hover:bg-primary-subtle text-primary motion-safe:transition-all flex items-center gap-1 border border-transparent hover:border-border motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_attendance-attendance-managerattendancetable-button-view-monthly-calendar-${mapIndex}`} onClick={(event) => { event.stopPropagation(); setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendancePersonType }); }}  title={t("COPY_VIEW_MONTHLY_CALENDAR")} aria-label={t("COPY_VIEW_MONTHLY_ATTENDANCE_CALENDAR")}>
                      <Calendar size={18} strokeWidth={2} data-testid="manager_attendance-managerattendancetable-interactive"/>
                      <span className="text-xs font-medium">{t("COPY_HISTORY")}</span>
                    </button>
                  </td>
                </tr>))}
              {records.length === 0 && (<tr>
                  <td colSpan={ATTENDANCE_TABLE_HEADERS.length} className="p-0 border-b-0">
                    <ManagerAttendanceEmptyState />
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>); })(); })()}

      <div className="border-t border-border mt-4 pt-4">
        <ManagerPagination data-testid="manager_attendance-managerattendancetable-managerpagination-1"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
