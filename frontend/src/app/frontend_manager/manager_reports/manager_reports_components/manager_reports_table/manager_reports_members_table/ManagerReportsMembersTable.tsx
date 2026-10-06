// RESPONSIBILITY: Renders ManagerReportsMembersTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerReportsEmptyState from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/ManagerReportsEmptyState';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';
import { ManagerReportsFormatNumber } from '@/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters';


/** @description Renders the ManagerReportsMembersTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsMembersTable() {
  const t = useTranslations('MANAGER_REPORTS');

  const { summary } = useManagerReportsLogic();
  const data = summary?.memberChurnData ?? [];
  return (
    <div data-testid="manager_reports-managerreportsmemberstable-region" className="w-full overflow-x-auto"role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_2")}>
      <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {[t('COPY_MONTH'), t('TEXT_SERIES_NEW_MEMBERS'), t('COPY_LOST'), t('COPY_ACTIVE')].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={4}><ManagerReportsEmptyState /></td></tr> : data.map(d => (
          <tr key={d.month} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
            <td className="px-5 py-3.5 text-sm font-medium text-primary">{d.month}</td>
            <td className="px-5 py-3.5 text-sm text-success font-semibold">+{ManagerReportsFormatNumber(d.newMembers)}</td>
            <td className="px-5 py-3.5 text-sm text-danger">-{ManagerReportsFormatNumber(d.churned)}</td>
            <td className="px-5 py-3.5 text-sm font-semibold text-primary">{ManagerReportsFormatNumber(d.active)}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
