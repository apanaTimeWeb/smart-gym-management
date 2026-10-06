"use client";
// RESPONSIBILITY: Renders the Admin attendance report summary with functional sorting and the API-backed heatmap dataset.
import { useLocale, useTranslations } from 'next-intl';
import { AdminReportsEmptyState } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_empty_state/AdminReportsEmptyState';
import AdminReportsAttendanceSortIcon from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_attendance/AdminReportsAttendanceSortIcon';
import AdminLayoutProgressBar from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar';
import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';
import { formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatters';
import type { AttendanceSortKey, AdminReportsAttendanceReportData } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsAttendanceTypes';
import { useAdminReportsAttendanceTable } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_attendance/useAdminReportsAttendanceTable';

/**
 * @description AdminReportsAttendance renders summary and heatmap tables; sorting state is delegated to useAdminReportsAttendanceTable.
 * @dependencies useAdminReportsLogic, useAdminReportsAttendanceTable, report formatters, and shared attendance components.
 * @edge-case Preserves the module-owned empty state and translated accessibility label when attendance data is unavailable.
 */
export default function AdminReportsAttendance() {
  const locale = useLocale();
  const t = useTranslations();
  const { reportData } = useAdminReportsLogic();
  const { rows, sortKey, sortDir, handleSort } = useAdminReportsAttendanceTable(reportData?.attendanceSummary);

  const headers: ReadonlyArray<{ key: AttendanceSortKey; label: string }> = [
    { key: 'gymName', label: t('reports.AdminAuditRepair.gym') },
    { key: 'avgDailyAttendance', label: t('reports.AdminAuditRepair.avgDailyCheckIns') },
    { key: 'totalCheckIns', label: t('reports.AdminAuditRepair.totalCheckIns') },
    { key: 'attendanceRate', label: t('reports.AdminAuditRepair.attendanceRate') },
    { key: 'peakDay', label: t('reports.AdminAuditRepair.peakDay') },
  ];
  const dayLabels = {
    Mon: t('reports.AdminAuditRepair.monday'), Tue: t('reports.AdminAuditRepair.tuesday'), Wed: t('reports.AdminAuditRepair.wednesday'),
    Thu: t('reports.AdminAuditRepair.thursday'), Fri: t('reports.AdminAuditRepair.friday'), Sat: t('reports.AdminAuditRepair.saturday'), Sun: t('reports.AdminAuditRepair.sunday'),
  } as const;

  if (!reportData) return null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_attendance.text_aff29fd842')}</h2></div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead><tr className="bg-surface-highlight">
              {headers.map((header, index) => (
                <th role="button" tabIndex={0} key={header.key} onClick={() => handleSort(header.key)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-sort={sortKey === header.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'} data-testid={`admin_reports-admin_reports-attendance-control-${index}`}>
                  <div className="flex items-center gap-1.5">{header.label}<AdminReportsAttendanceSortIcon column={header.key} sortKey={sortKey} sortDir={sortDir} /></div>
                </th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 ? <tr><td colSpan={headers.length}><AdminReportsEmptyState title={t('reports.admin_reports_attendance.text_0e47830c90')} description={t('reports.admin_reports_attendance.auto_1d0c4b148c')} /></td></tr> : rows.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{row.gymName}</td>
                  <td className="px-5 py-4 text-sm text-primary">{row.avgDailyAttendance}</td>
                  <td className="px-5 py-4 text-sm text-primary">{formatNumber(row.totalCheckIns, locale)}</td>
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><div className="flex-1 max-w-24"><AdminLayoutProgressBar value={row.attendanceRate} label={t('reports.AdminReportsAttendance.auto_attendanceRate', { gymName: row.gymName })} variant="success" /></div><span className="text-sm font-semibold text-primary">{formatPercent1dp(row.attendanceRate, locale)}%</span></div></td>
                  <td className="px-5 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary">{dayLabels[row.peakDay as keyof typeof dayLabels] ?? row.peakDay}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between"><h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_attendance.text_373e6c1e10')}</h2><div className="flex items-center gap-3 text-xs text-secondary"><span>{t('reports.admin_reports_attendance.text_cabfc9d38a')}</span><span>{t('reports.admin_reports_attendance.text_ff8daa2365')}</span><span>{t('reports.admin_reports_attendance.text_c040292c67')}</span><span>{t('reports.admin_reports_attendance.text_4e0fa4378f')}</span></div></div>
        <div className="p-5 overflow-x-auto"><table data-admin-responsive-table className="w-full"><thead><tr><th className="text-left text-xs font-semibold text-secondary uppercase tracking-wider pb-3 pr-4 w-32">{t('reports.admin_reports_attendance.text_bc4359231d')}</th>{(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const).map((day) => <th key={day} className="text-center text-xs font-semibold text-secondary uppercase tracking-wider pb-3 px-1">{dayLabels[day]}</th>)}</tr></thead><tbody className="divide-y divide-border">{rows.length === 0 ? <tr><td colSpan={8}><AdminReportsEmptyState title={t('reports.admin_reports_attendance.text_c221964277')} description={t('reports.admin_reports_attendance.auto_f0707f1ee7')} /></td></tr> : rows.map((gym) => { const heatmap = (reportData as AdminReportsAttendanceReportData).attendanceHeatmap ?? []; const byDay = heatmap.filter((cell) => cell.gymId === gym.gymId); return <tr key={gym.gymId}><td className="text-sm font-medium text-primary pr-4 py-2">{gym.gymName}</td>{(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const).map((day) => { const cell = byDay.find((item) => item.day === day); const rate = cell?.rate ?? gym.attendanceRate; return <td key={day} className="px-1 py-1"><div className={`w-full h-9 rounded-lg flex items-center justify-center text-xs font-bold ${rate >= 80 ? 'bg-success text-on-success' : rate >= 60 ? 'bg-warning-bg text-warning' : rate >= 40 ? 'bg-info text-on-info' : 'bg-danger text-on-danger border border-border'}`}>{formatPercent1dp(rate, locale)}%</div></td>; })}</tr>; })}</tbody></table></div>
      </div>
    </div>
  );
}
