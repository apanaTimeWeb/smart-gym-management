// RESPONSIBILITY: Renders the Attendance table with server-side sort/pagination and keyboard/touch-safe row expansion.
'use client';
// DATA FLOW: URL-backed Attendance filters → TanStack Query → TrainerAttendanceTable props → visible records.
import { Fragment, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Clock } from 'lucide-react';
import { ATTENDANCE_TABLE_HEADERS } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import { formatAttendanceDate, formatAttendanceTime } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceDateFormatters';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import TrainerAttendanceEmptyState from '@/app/trainer/attendance/attendance_components/TrainerAttendanceEmptyState/TrainerAttendanceEmptyState';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';
import type { AttendanceSortField, AttendanceSortDirection } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';
import type { TrainerAttendanceSortableHeaderProps } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceSortableHeaderProps';
import type { TrainerAttendanceTableProps } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceTableProps';
import { displayValue, formatNumber } from '@/lib/formatters';

const TABLE_COLUMNS = ATTENDANCE_TABLE_HEADERS.length;
const SORT_FIELDS: readonly AttendanceSortField[] = ['name', 'type', 'date', 'checkIn', 'checkOut', 'durationMinutes', 'checkInMethod'];
const SKELETON_ROW_IDS = ['attendance-skeleton-1','attendance-skeleton-2','attendance-skeleton-3','attendance-skeleton-4','attendance-skeleton-5'] as const;

/** Renders one sortable column header and exposes the active direction to assistive technology. */
function TrainerAttendanceSortableHeader({ label, field, sortBy, sortDirection, onSort }: TrainerAttendanceSortableHeaderProps) {
  const active = field === sortBy;
  const Icon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
      <button type="button" onClick={() => onSort(field)} aria-label={`Sort by ${label}`} className="min-h-11 inline-flex items-center gap-1.5 rounded motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span>{label}</span><Icon size={18} strokeWidth={2} aria-hidden="true" className={active ? 'text-primary' : 'text-secondary'} />
      </button>
    </th>
  );
}

function getPersonName(record: TrainerAttendanceTableProps['records'][number]) {
  return record.type === 'MEMBER' ? (record.member?.name ?? null) : (record.staff?.name ?? null);
}

export default function TrainerAttendanceTable({ records, totalRecords, isPending, search, filterDate, currentPage, sortBy, sortDirection, onPageChange, onSort }: TrainerAttendanceTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(totalRecords / TRAINER_ITEMS_PER_PAGE));
  const hasFilter = Boolean(search.trim()) || filterDate !== 'All Time';

  if (isPending) {
    return (
      <div className="p-5" aria-busy="true" aria-label="Loading attendance records">
        <div className="space-y-2 motion-safe:animate-pulse">
          {SKELETON_ROW_IDS.map((id) => <div key={id} className="h-16 rounded-xl bg-skeleton-base border border-border" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-highlight">
            <tr>{ATTENDANCE_TABLE_HEADERS.map((header, index) => <TrainerAttendanceSortableHeader key={header} label={header} field={SORT_FIELDS[index]!} sortBy={sortBy} sortDirection={sortDirection} onSort={onSort} />)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {records.length === 0 ? (
              <tr><td colSpan={TABLE_COLUMNS} className="p-0"><TrainerAttendanceEmptyState isFiltered={hasFilter} /></td></tr>
            ) : records.map((record) => {
              const personName = getPersonName(record);
              const initial = personName?.charAt(0).toUpperCase() ?? '?';
              const expanded = expandedId === record.id;
              return (
                <Fragment key={record.id}>
                  <tr
                    tabIndex={0}
                    aria-expanded={expanded}
                    onClick={() => setExpandedId((current) => current === record.id ? null : record.id)}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedId((current) => current === record.id ? null : record.id); } }}
                    className="cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base"
                  >
                    <td className="px-4 py-3 whitespace-nowrap"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">{initial}</div><div><div className="text-sm font-medium text-primary truncate max-w-52">{displayValue(personName)}</div><div className="text-xs text-secondary">{record.type}</div></div></div></td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${record.type === 'MEMBER' ? 'bg-info-bg text-info' : 'bg-success-bg text-success'}`}>{record.type}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{formatAttendanceDate(record.date)}</td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap"><span className="flex items-center gap-1"><Clock size={18} strokeWidth={2} className="text-secondary" aria-hidden="true" />{formatAttendanceTime(record.checkIn)}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{formatAttendanceTime(record.checkOut)}</td>
                    <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{record.durationMinutes == null ? '—' : `${formatNumber(record.durationMinutes)}m`}</td>
                    <td className="px-4 py-3"><span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-input text-secondary border border-border">{displayValue(record.checkInMethod)}</span></td>
                  </tr>
                  {expanded && <tr key={`${record.id}-details`} className="bg-surface-highlight"><td colSpan={TABLE_COLUMNS} className="px-4 py-3 text-sm text-secondary"><div className="grid grid-cols-1 sm:grid-cols-3 gap-3"><span><strong className="text-primary">Record ID:</strong> {record.id}</span><span><strong className="text-primary">Notes:</strong> {displayValue(record.notes)}</span><span><strong className="text-primary">Check-in method:</strong> {displayValue(record.checkInMethod)}</span></div></td></tr>}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border mt-4 pt-4"><TrainerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalRecords} itemsPerPage={TRAINER_ITEMS_PER_PAGE} onPageChange={onPageChange} /></div>
    </div>
  );
}
