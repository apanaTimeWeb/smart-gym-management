// RESPONSIBILITY: Renders the attendance data table and pagination controls.
// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.
'use client';

import { Clock, Calendar, CalendarCheck, Fingerprint, QrCode, Edit } from 'lucide-react';
import { useAttendanceContext } from '@/app/manager/attendance/attendance_context/ManagerAttendanceContext';
import { ATTENDANCE_TABLE_HEADERS, formatDate, formatTime } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import type { CheckInMethod } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';

/** Formats durationMinutes into a readable "Xh Ym" string. */
function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Renders the check-in method badge with an appropriate icon. */
function CheckInMethodBadge({ method }: { method?: CheckInMethod }) {
  if (!method) return <span className="text-secondary text-xs">—</span>;
  const config: Record<CheckInMethod, { icon: React.ReactNode; label: string; class: string }> = {
    QR:        { icon: <QrCode size={11} />,       label: 'QR',       class: 'bg-info-bg text-info' },
    Manual:    { icon: <Edit size={11} />,          label: 'Manual',   class: 'bg-warning-bg text-warning' },
    Biometric: { icon: <Fingerprint size={11} />,   label: 'Biometric', class: 'bg-success-bg text-success' },
  };
  const { icon, label, class: cls } = config[method];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {icon}{label}
    </span>
  );
}

export default function AttendanceTable() {
  const { records, totalRecords, fetchState, tab, currentPage, setCurrentPage, setCalendarUser } = useAttendanceContext();

  const filteredRecords = records.filter(r =>
    tab === 'Daily Attendance Report' ||
    (tab === 'Member Attendance' && r.type === 'MEMBER') ||
    ((tab === 'Trainer Attendance' || tab === 'Staff Attendance') && r.type === 'STAFF')
  );

  const totalPages = Math.ceil(filteredRecords.length / MANAGER_ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * MANAGER_ITEMS_PER_PAGE;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + MANAGER_ITEMS_PER_PAGE);

  return (
    <div className="p-5">
      {fetchState === 'loading' ? (
        <div className="motion-safe:animate-pulse bg-card rounded-xl border border-border mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-border flex items-center px-4 gap-4">
              <div className="h-8 w-8 bg-muted rounded-full"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
              <div className="h-4 bg-muted rounded-full w-16"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : fetchState === 'error' ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-danger/30 mt-4">
          <p className="text-danger font-medium">Failed to load attendance records.</p>
          <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
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
                <tr key={r.id} className="hover:bg-primary-subtle transition-colors">
                  {/* Name */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        r.type === 'MEMBER' ? 'bg-info' : 'bg-success'
                      }`}>
                        {(r.member?.name || r.staff?.name || '?').charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {r.member?.name || r.staff?.name || '—'}
                      </span>
                    </div>
                  </td>
                  {/* Type */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      r.type === 'MEMBER'
                        ? 'bg-info-bg text-info'
                        : 'bg-success-bg text-success'
                    }`}>
                      {r.type}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      (r.checkIn || r.status === 'PRESENT' || r.type === 'MEMBER') ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                    }`}>
                      {(r.checkIn || r.status === 'PRESENT' || r.type === 'MEMBER') ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{formatDate(r.date)}</td>
                  {/* Check In */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock size={13} className="opacity-50" />
                      {formatTime(r.checkIn)}
                    </div>
                  </td>
                  {/* Check Out — CRITICAL FIX */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock size={13} className="opacity-50" />
                      {formatTime(r.checkOut ?? r.checkOutTime)}
                    </div>
                  </td>
                  {/* Duration — CRITICAL FIX */}
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                    {formatDuration(r.durationMinutes)}
                  </td>
                  {/* Method — CRITICAL FIX */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <CheckInMethodBadge method={r.checkInMethod} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={() => setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name), type: r.type as 'MEMBER' | 'STAFF' })}
                      className="p-1.5 rounded-md hover:bg-primary-subtle text-primary transition-colors flex items-center gap-1 border border-transparent hover:border-border"
                      title="View Monthly Calendar"
                      aria-label="View Monthly Attendance Calendar"
                    >
                      <Calendar size={14} />
                      <span className="text-xs font-medium">History</span>
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={ATTENDANCE_TABLE_HEADERS.length} className="p-0 border-b-0">
                    <ManagerEmptyState
                      icon={<CalendarCheck size={32} />}
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
