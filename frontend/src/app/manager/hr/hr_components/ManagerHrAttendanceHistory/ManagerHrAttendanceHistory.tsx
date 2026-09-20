// RESPONSIBILITY: Renders read-only staff attendance history from the documented Manager HR attendance API; no attendance mutation UI is fabricated here.
'use client';
import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { formatDate, displayValue } from '@/lib/formatters';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { useManagerHrStaffAttendanceQuery } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrStaffAttendanceQuery';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import type { ManagerHrStaffAttendanceRecord } from '@/app/manager/hr/hr_types/ManagerHrStaffAttendanceTypes';


const ATTENDANCE_COLUMN_COUNT = 4;

function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

function getStatusClass(status: string) {
  if (status === 'PRESENT') return 'bg-success-bg text-success border-success';
  if (status === 'ABSENT') return 'bg-danger-bg text-danger border-danger';
  return 'bg-warning-bg text-warning border-warning';
}

export default function ManagerHrAttendanceHistory() {
  const { staff } = useManagerHrLogic();
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [month, setMonth] = useState(getCurrentMonth);

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!selectedStaffId && staff[0]?.id) setSelectedStaffId(staff[0].id);
  }, [selectedStaffId, staff]);

  const { data, isPending, isError, error } = useManagerHrStaffAttendanceQuery(selectedStaffId, month);
  const history: ManagerHrStaffAttendanceRecord[] = data?.data?.history ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary">Trainer Attendance History</h2>
          <p className="text-sm text-secondary">Read-only attendance records supplied by the Manager HR attendance API.</p>
        </div>
        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          <div className="min-w-56">
            <label className="mb-1 block text-xs text-secondary" htmlFor="manager-hr-attendance-staff">Staff member</label>
            <ManagerSearchableDropdown
              value={selectedStaffId}
              onChange={(value) => setSelectedStaffId(String(value))}
              options={staff.map((member) => ({ value: member.id, label: `${member.name} (${member.role})` }))}
              placeholder="Select staff"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-secondary" htmlFor="manager-hr-attendance-month">Month</label>
            <input id="manager-hr-attendance-month" type="month" value={month} onChange={(event) => setMonth(event.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-highlight">
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">Date</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">Status</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">Check-in</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-secondary">Check-out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {isPending ? (
              Array.from({ length: 5 }, (_, index) => (
                <tr key={`attendance-loading-${index}`} className="motion-safe:animate-pulse">
                  {Array.from({ length: ATTENDANCE_COLUMN_COUNT }, (_, cellIndex) => (
                    <td key={`attendance-loading-${index}-${cellIndex}`} className="p-4"><div className="h-4 w-24 rounded bg-input" /></td>
                  ))}
                </tr>
              ))
            ) : isError ? (
              <tr><td colSpan={ATTENDANCE_COLUMN_COUNT} className="p-10 text-center text-danger">{error instanceof Error ? error.message : MANAGER_GENERIC_ERROR_MESSAGE}</td></tr>
            ) : history.length === 0 ? (
              <tr><td colSpan={ATTENDANCE_COLUMN_COUNT} className="p-10 text-center text-secondary"><CalendarDays size={18} aria-hidden="true" className="mx-auto mb-2 opacity-40" />No attendance records were returned for the selected month.</td></tr>
            ) : (
              history.map((record) => (
                <tr key={`${record.date}-${record.status}`}>
                  <td className="p-4 text-primary">{formatDate(record.date)}</td>
                  <td className="p-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(record.status)}`}>{displayValue(record.status)}</span></td>
                  <td className="p-4 text-secondary">{displayValue(record.checkIn)}</td>
                  <td className="p-4 text-secondary">{displayValue(record.checkOut)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
