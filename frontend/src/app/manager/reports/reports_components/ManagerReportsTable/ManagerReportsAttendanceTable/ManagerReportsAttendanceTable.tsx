// RESPONSIBILITY: Renders the ManagerReportsAttendanceTable sub-view extracted from ManagerReportsTable; owns only this presentation responsibility.
'use client';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import ManagerReportsEmptyState from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsEmptyState';
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';


export function ManagerReportsAttendanceTable() {
  const { summary } = useManagerReportsLogic();
  const data = (summary?.attendanceData ?? []).slice(-14);
  return (
    <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {['Date', 'Present', 'Absent', 'Rate'].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={4}><ManagerReportsEmptyState /></td></tr> : data.map((d) => (
          <tr key={d.date} className="hover:bg-primary-subtle motion-safe:transition-colors">
            <td className="px-5 py-3.5 text-sm text-primary">{d.date}</td>
            <td className="px-5 py-3.5 text-sm text-success font-semibold">{formatNumber(d.present)}</td>
            <td className="px-5 py-3.5 text-sm text-danger">{formatNumber(d.absent)}</td>
            <td className="px-5 py-3.5 text-sm font-semibold text-primary">{d.rate}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
