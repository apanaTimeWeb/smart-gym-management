// RESPONSIBILITY: Renders ManagerHrLedgerTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import ManagerHrLedgerEmptyState from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_ledger_empty_state/ManagerHrLedgerEmptyState';
import { useManagerHrLedgerQuery } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLedgerQuery';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { ManagerHrDisplayValue, ManagerHrFormatCurrency, ManagerHrFormatDate } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';


/**
 * @description Renders/orchestrates the ManagerHrLedgerTable user interface for the hr module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters; @/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_ledger_empty_state/ManagerHrLedgerEmptyState; @/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLedgerQuery; @/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic; @/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const HR_LEDGER_COLUMN_COUNT = 6;

/** @description Renders the ManagerHrLedgerTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state. */
export default function ManagerHrLedgerTable() {
  const t = useTranslations('MANAGER_HR');
  const locale = useLocale();

  const { staff } = useManagerHrLogic();
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const effectiveStaffId = selectedStaffId || staff[0]?.id || '';
  const { data: ledgerResponse, isPending: loading, isError, error } = useManagerHrLedgerQuery(effectiveStaffId);
  const ledger = ledgerResponse?.data?.ledger ?? [];

  const selectedStaff = staff.find(s => String(s.id) === String(effectiveStaffId));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-end">
        <div>
          <h2 className="text-lg font-bold text-primary">{t("COPY_STAFF_LEDGER")}</h2>
          <p className="text-sm text-secondary">{t("COPY_VIEW_DETAILED_TRANSACTION_HISTORY_STAFF_MEMBERS")}</p>
        </div>
        <div className="w-full sm:w-64">
          <label htmlFor="manager-managerhrledgertable-field-1" className="block text-xs text-secondary mb-1">{t("COPY_SELECT_STAFF_MEMBER")}</label>
          <ManagerSearchableDropdown ariaLabel={t("COPY_SELECT_STAFF_MEMBER")} dataTestId="manager_hr-managerhrledgertable-managersearchabledropdown-1"
            value={effectiveStaffId}
            onChange={(value) => setSelectedStaffId(String(value))}
            options={staff.map((member) => ({ value: member.id, label: `${member.name} (${member.role})` }))}
            placeholder={t("COPY_SELECT_STAFF_5")}
           data-testid="manager_hr-managerhrledgertable-searchable-dropdown-1"/>
        </div>
      </div>

      {selectedStaff && (
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
          <div className="bg-card p-4 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-xs text-secondary uppercase">{t("COPY_BASE_SALARY_2")}</p>
            <p className="text-xl font-bold text-primary">{ManagerHrFormatCurrency(selectedStaff.salary || 0, ManagerEnvConfig.currencyCode, locale)}{t("COPY_MO")}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-xs text-secondary uppercase">{t("COPY_ADVANCE_BALANCE_2")}</p>
            <p className="text-xl font-bold text-danger">{ManagerHrFormatCurrency(selectedStaff.advanceSalary || 0, ManagerEnvConfig.currencyCode, locale)}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-xs text-secondary uppercase">{t("COPY_DUE_AMOUNT")}</p>
            <p className="text-xl font-bold text-warning">{ManagerHrFormatCurrency(selectedStaff.currentDue || 0, ManagerEnvConfig.currencyCode, locale)}</p>
          </div>
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-input border-b border-border text-sm">
                <th className="p-4 font-medium text-secondary whitespace-nowrap">{t("COPY_DATE_1")}</th>
                <th className="p-4 font-medium text-secondary whitespace-nowrap">{t("COPY_TRANSACTION_TYPE")}</th>
                <th className="p-4 font-medium text-secondary">{t("COPY_NOTES_1")}</th>
                <th className="p-4 font-medium text-secondary text-right">{t("COPY_CREDIT")}</th>
                <th className="p-4 font-medium text-secondary text-right">{t("COPY_DEBIT")}</th>
                <th className="p-4 font-medium text-secondary text-right bg-primary-subtle">{t("COPY_BALANCE")}</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {(() => { if (loading) { return (
                [1, 2, 3, 4, 5].map((skeletonRow) => (
                  <tr key={`ledger-loading-row-${skeletonRow}`} className="motion-safe:animate-pulse">
                    {Array.from({ length: HR_LEDGER_COLUMN_COUNT }, (_, cellIndex) => (
                      <td key={`ledger-loading-row-${skeletonRow}-cell-${cellIndex + 1}`} className="p-4"><div className="h-4 w-full max-w-32 rounded bg-input" /></td>
                    ))}
                  </tr>
                ))
              ); } return (() => { if (isError) { return (
                <tr><td colSpan={HR_LEDGER_COLUMN_COUNT} className="p-10 text-center text-danger">{error instanceof Error ? error.message : t("TEXT_GENERIC_ERROR")}</td></tr>
              ); } return (() => { if (ledger.length === 0) { return (
                <tr><td colSpan={HR_LEDGER_COLUMN_COUNT} className="p-0"><ManagerHrLedgerEmptyState /></td></tr>
              ); } return (
                ledger.map(l => (
                  <tr key={l.id} className="hover:bg-surface-highlight motion-safe:transition-all motion-safe:duration-base ease-in-out">
                    <td className="p-4 text-primary whitespace-nowrap">{ManagerHrFormatDate(l.date)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        ${(() => { if (l.type.includes('Advance')) { return 'bg-danger text-on-danger'; } return (() => { if (l.type.includes('Salary Generated')) { return 'bg-info text-on-info'; } return (() => { if (l.type.includes('Due')) { return 'bg-warning text-on-warning'; } return 'bg-success text-on-success'; })(); })(); })()}`} data-testid="manager_hr-managerhrledgertable-status-badge-1">
                        {l.type}
                      </span>
                    </td>
                    <td className="p-4 text-secondary max-w-50 truncate" title={ManagerHrDisplayValue(l.notes)}>{ManagerHrDisplayValue(l.notes)}</td>
                    <td className="p-4 text-right text-success font-medium">{l.credit > 0 ? `+${ManagerHrFormatCurrency(l.credit, ManagerEnvConfig.currencyCode, locale)}` : '—'}</td>
                    <td className="p-4 text-right text-danger font-medium">{l.debit > 0 ? `-${ManagerHrFormatCurrency(l.debit, ManagerEnvConfig.currencyCode, locale)}` : '—'}</td>
                    <td className="p-4 text-right font-bold text-primary bg-primary-subtle">{ManagerHrFormatCurrency(l.balance, ManagerEnvConfig.currencyCode, locale)}</td>
                  </tr>
                ))
              ); })(); })(); })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
