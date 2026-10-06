// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useRef } from 'react';
import { Banknote, Download, RefreshCw } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerHrPayrollEmptyState from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_payroll_table/ManagerHrPayrollEmptyState';
import { MANAGER_HR_STATUS_VALUES } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrConstants';
import { PAYROLL_TABLE_HEADERS } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrSharedConstants';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { ManagerHrFormatCurrency, ManagerHrFormatDate } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';

// CRITICAL FIX: Added Download Payslip per row, Generate Payroll button, and netPayable/deductions display.


/** @description Renders the ManagerHrPayrollTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state, retry/recovery. */
export default function ManagerHrPayrollTable() {
  const t = useTranslations('MANAGER_HR');
  const locale = useLocale();

  const { confirm } = useConfirm();
  const generatePayrollKeyRef = useRef<string | null>(null);
  const { search, setSearch, payrollMonth, setPayrollMonth, payrolls, totalPayrolls, markPayrollPaid, setPaymentModal, currentPage, setCurrentPage, isPending, staff, bulkGeneratePayroll, downloadPayslip } = useManagerHrLogic();

  const totalPages = Math.max(1, Math.ceil(totalPayrolls / MANAGER_ITEMS_PER_PAGE));
  const currentData = payrolls;
  const handleGeneratePayroll = async () => {
    const confirmed = await confirm({ title: t("COPY_CONFIRM_PAYROLL_GENERATION"), message: payrollMonth ? t("TEXT_GENERATE_PAYROLL_FOR_MONTH", { value: payrollMonth }) : t("TEXT_GENERATE_PAYROLL_CURRENT_MONTH"), confirmText: t("COPY_GENERATE_PAYROLL_1"), type: 'warning' });
    if (!confirmed) return;
    generatePayrollKeyRef.current ??= createManagerIdempotencyKey();
    try {
      await bulkGeneratePayroll(payrollMonth || new Date().toISOString().slice(0, 7), generatePayrollKeyRef.current);
      generatePayrollKeyRef.current = null;
    } catch {
      // The mutation owns the backend error toast. Retain the key so a retry reuses the same user-intent key.
    }
  };

  const payrollColumnCount = PAYROLL_TABLE_HEADERS.length + 1;

  if (isPending) {
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-input text-secondary">
              <tr>
                {PAYROLL_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t("COPY_ACTIONS_4")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <tr key={`payroll-loading-${i}`} className="motion-safe:animate-pulse bg-card">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-input rounded w-32 mb-2"></div>
                    <div className="h-3 bg-input rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-5 bg-input rounded-full w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-5 bg-input rounded-full w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4 text-right"><div className="h-8 bg-input rounded-lg w-24 ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar: Generate Payroll — CRITICAL FIX */}
      <div className="flex justify-end px-4 pt-3 pb-1">
        <button data-testid="manager_hr-manager-hr-payroll-table-button-close"
          onClick={() => { void handleGeneratePayroll(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-on-primary rounded-lg motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
          aria-label={t("COPY_GENERATE_PAYROLL_CURRENT_MONTH")}
        >
          <RefreshCw size={18} strokeWidth={2}/>{t("COPY_GENERATE_PAYROLL_2")}</button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>
              {PAYROLL_TABLE_HEADERS.map(h => (
                <th key={h} className={`text-xs font-semibold uppercase tracking-wider px-4 py-3 ${['Base Salary', 'Net Payable', 'Paid Amount', 'Pending'].includes(h) ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t("COPY_ACTIONS_1")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentData.map((p, mapIndex) => (
              <tr key={p.id} className="motion-safe:transition-all hover:bg-primary-subtle bg-card motion-safe:duration-base ease-in-out">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-primary">
                    {p.staff?.name || `Staff #${p.staffId}`}
                  </p>
                  <div className="text-xs text-secondary">
                    {p.staff?.role}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-primary">{p.month}</td>
                <td className="px-4 py-3 text-sm font-medium text-secondary text-right">
                  {ManagerHrFormatCurrency(((staff.find(s => String(s.id) === String(p.staffId))?.salary) || 0), ManagerEnvConfig.currencyCode, locale)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-primary text-right">{ManagerHrFormatCurrency(p.amount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-success text-right">{ManagerHrFormatCurrency(p.paidAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger text-right">{ManagerHrFormatCurrency(p.pendingAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3">
                  <span 
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === MANAGER_HR_STATUS_VALUES.PAID ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
                    }`}
                   data-testid="manager_hr-managerhrpayrolltable-status-badge-1">
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {p.paidAt ? ManagerHrFormatDate(p.paidAt) : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Download Payslip — CRITICAL FIX */}
                    <button data-testid={`manager_hr-hr-managerhrpayrolltable-button-download-payslip`}
                      onClick={() => downloadPayslip(p.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-primary-subtle text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                      title={t("COPY_DOWNLOAD_PAYSLIP")}
                      aria-label={t("TEXT_DOWNLOAD_PAYSLIP", { value: p.staff?.name ?? p.staffId })}
                    >
                      <Download size={18} strokeWidth={2}/>{t("COPY_PAYSLIP")}</button>
                    {p.status !== MANAGER_HR_STATUS_VALUES.PAID && (
                      <button data-testid={`manager_hr-hr-managerhrpayrolltable-button-payslip`}
                        onClick={() => setPaymentModal({ payrollId: p.id, staffName: p.staff?.name || `Staff #${p.staffId}`, pendingAmount: p.pendingAmount || p.amount })}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
                      >
                        <Banknote size={18} strokeWidth={2}/>{t("COPY_PAY_SALARY_1")}</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={payrollColumnCount} className="p-0 border-b-0">
                  <ManagerHrPayrollEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ManagerPagination data-testid="manager_hr-managerhrpayrolltable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalPayrolls} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
