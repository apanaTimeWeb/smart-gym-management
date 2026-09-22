// RESPONSIBILITY: Renders the payroll records table with pay status badges and mark-as-paid inline action.
'use client';
import { useRef } from 'react';
import { CheckCircle2, Search, Banknote, Download, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { formatDate } from '@/lib/formatters';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { PAYROLL_TABLE_HEADERS } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { useLocale } from "next-intl";

// CRITICAL FIX: Added Download Payslip per row, Generate Payroll button, and netPayable/deductions display.


export default function ManagerHrPayrollTable() {
    const locale = useLocale();
  const { confirm } = useConfirm();
  const generatePayrollKeyRef = useRef<string | null>(null);
  const { search, setSearch, payrollMonth, setPayrollMonth, payrolls, totalPayrolls, markPayrollPaid, setPaymentModal, currentPage, setCurrentPage, isPending, staff, bulkGeneratePayroll, downloadPayslip } = useManagerHrLogic();

  const totalPages = Math.max(1, Math.ceil(totalPayrolls / MANAGER_ITEMS_PER_PAGE));
  const currentData = payrolls;
  const handleGeneratePayroll = async () => {
    const confirmed = await confirm({ title: 'Confirm Payroll Generation', message: `Generate payroll records for ${payrollMonth || 'the current month'}?`, confirmText: 'Generate Payroll', type: 'warning' });
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
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th>
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
        <button
          onClick={() => { void handleGeneratePayroll(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-on-primary rounded-lg hover:opacity-90 motion-safe:transition-opacity"
          aria-label="Generate payroll for current month"
        >
          <RefreshCw size={18} /> Generate Payroll
        </button>
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
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentData.map(p => (
              <tr key={p.id} className="motion-safe:transition-colors hover:bg-primary-subtle bg-card">
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
                  {formatCurrency(((staff.find(s => String(s.id) === String(p.staffId))?.salary) || 0), ManagerEnvConfig.currencyCode, locale)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-primary text-right">{formatCurrency(p.amount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-success text-right">{formatCurrency(p.paidAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger text-right">{formatCurrency(p.pendingAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3">
                  <span 
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === 'Paid' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {p.paidAt ? formatDate(p.paidAt) : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Download Payslip — CRITICAL FIX */}
                    <button
                      onClick={() => downloadPayslip(p.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-primary-subtle text-secondary hover:text-primary motion-safe:transition-colors"
                      title="Download Payslip"
                      aria-label={`Download payslip for ${p.staff?.name ?? p.staffId}`}
                    >
                      <Download size={18} /> Payslip
                    </button>
                    {p.status !== 'Paid' && (
                      <button
                        onClick={() => setPaymentModal({ payrollId: p.id, staffName: p.staff?.name || `Staff #${p.staffId}`, pendingAmount: p.pendingAmount || p.amount })}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-on-success bg-primary-subtle rounded-lg hover:bg-primary-hover motion-safe:transition-colors"
                      >
                        <Banknote size={18} /> Pay Salary
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={payrollColumnCount} className="p-0 border-b-0">
                  <ManagerEmptyState 
                    icon={<Banknote size={18} />}
                    title="No payroll records found"
                    subtitle="There are no payroll records for the selected filters."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ManagerPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalPayrolls} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
