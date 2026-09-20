'use client';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { displayValue, formatDate } from '@/lib/formatters';
// RESPONSIBILITY: Renders the attendance data table and pagination controls.
// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.
import { Clock, Calendar, CalendarCheck, Fingerprint, QrCode, Edit } from 'lucide-react';
import { useManagerAttendanceLogic } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceLogic';
import type { ManagerAttendancePersonType } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import { ATTENDANCE_TABLE_HEADERS, formatTime } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { ManagerAttendanceCheckInMethodBadge } from '@/app/manager/attendance/attendance_components/AttendanceTable/ManagerAttendanceCheckInMethodBadge/ManagerAttendanceCheckInMethodBadge';


/** Formats durationMinutes into a readable "Xh Ym" string. */
function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function ManagerAttendanceTable() {
  const { records, totalRecords, isLoading, isError, errorMessage, currentPage, setCurrentPage, setCalendarUser } = useManagerAttendanceLogic();

  const totalPages = Math.max(1, Math.ceil(totalRecords / MANAGER_ITEMS_PER_PAGE));
  const paginatedRecords = records;

  return (
    <div className="p-5">
      {isLoading ? (
        <div className="motion-safe:animate-pulse bg-card rounded-xl border border-border mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={`skeleton-${i}`} className="h-16 border-b border-border flex items-center px-4 gap-4">
              <div className="h-8 w-8 bg-input rounded-full"></div>
              <div className="h-4 bg-input rounded w-32"></div>
              <div className="h-4 bg-input rounded-full w-16"></div>
              <div className="h-4 bg-input rounded w-20"></div>
              <div className="h-4 bg-input rounded w-20"></div>
              <div className="h-4 bg-input rounded w-16"></div>
              <div className="h-4 bg-input rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-danger/30 mt-4">
          <p className="text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
          <span className="text-sm text-secondary">Retry the request.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-input">
              <tr>
                {ATTENDANCE_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedRecords.map(r => (
                <tr
                  key={r.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`View attendance history for ${r.member?.name || r.staff?.name || 'record'}`}
                  onClick={() => setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendancePersonType })}
                  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendancePersonType }); } }}
                  className="cursor-pointer hover:bg-primary-subtle motion-safe:transition-colors">
                  {/* Name */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        r.type === 'MEMBER' ? 'bg-info' : 'bg-success'
                      }`}>
                        {(r.member?.name || r.staff?.name || '?').charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {displayValue(r.member?.name ?? r.staff?.name)}
                      </span>
                    </div>
                  </td>
                  {/* Type */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      r.type === 'MEMBER'
                        ? 'bg-info text-on-info'
                        : 'bg-success text-on-success'
                    }`}>
                      {r.type}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      (r.checkIn || r.status === 'PRESENT' || r.type === 'MEMBER') ? 'bg-success text-on-success' : 'bg-danger text-on-danger'
                    }`}>
                      {(r.checkIn || r.status === 'PRESENT' || r.type === 'MEMBER') ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{formatDate(r.date)}</td>
                  {/* Check In */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock size={18} className="opacity-50" />
                      {formatTime(r.checkIn)}
                    </div>
                  </td>
                  {/* Check Out — CRITICAL FIX */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock size={18} className="opacity-50" />
                      {formatTime(r.checkOut ?? r.checkOutTime)}
                    </div>
                  </td>
                  {/* Duration — CRITICAL FIX */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    {formatDuration(r.durationMinutes)}
                  </td>
                  {/* Method — CRITICAL FIX */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <ManagerAttendanceCheckInMethodBadge method={r.checkInMethod} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={(event) => { event.stopPropagation(); setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendancePersonType }); }}
                      className="p-1.5 rounded-md hover:bg-primary-subtle text-primary motion-safe:transition-colors flex items-center gap-1 border border-transparent hover:border-border"
                      title="View Monthly Calendar"
                      aria-label="View Monthly Attendance Calendar"
                    >
                      <Calendar size={18} />
                      <span className="text-xs font-medium">History</span>
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={ATTENDANCE_TABLE_HEADERS.length} className="p-0 border-b-0">
                    <ManagerEmptyState
                      icon={<CalendarCheck size={18} />}
                      title="No attendance records"
                      subtitle="There are no check-ins for this date or filter yet."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-border mt-4 pt-4">
        <ManagerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
