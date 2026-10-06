"use client";
// RESPONSIBILITY: Renders the Admin HR payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL.
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrFormatters';

import { AdminHrFormatCurrency } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrFormatCurrency';

import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import type { AdminHrPayrollSortKey } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrUiTypes';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrSortTypes';
import { CheckCircle2 } from 'lucide-react';
import { PAYROLL_TABLE_HEADERS, PAYROLL_TABLE_HEADER_LABEL_KEYS, HR_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import AdminHrEmptyState from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_empty_state/AdminHrEmptyState';
import AdminHrPayrollSortIndicator from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payroll_table/AdminHrPayrollSortIndicator';
import { PAYROLL_STATUS, PAYROLL_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';

const PAYROLL_SORT_KEYS: Partial<Record<string, AdminHrPayrollSortKey>> = { Staff: 'staffName', Month: 'month', 'Net Payable': 'amount', 'Paid Amount': 'paidAmount', Pending: 'pendingAmount', Status: 'status', 'Paid On': 'paidAt' };


/**
 * AdminHrPayrollTable renders the admin hr payroll table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPayrollTable: Renders the Admin HR payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL.
 * @dependencies Consumes AdminHrFormatters, AdminHrFormatCurrency, useAdminHrViewModel, AdminHrUiTypes, AdminHrSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPayrollTable() {
  const locale = useLocale();
  const t = useTranslations();

  const { payrolls, currentPage, setCurrentPage, setPaymentModal, setShowPayrollModal, status, totalPayrolls, staff, payrollSortKey, payrollSortDir, setPayrollSort } = useAdminHrViewModel();
  const handleSort = (key: AdminHrPayrollSortKey) => setPayrollSort(key, payrollSortKey === key && payrollSortDir === 'asc' ? 'desc' : 'asc');
  const renderHeader = (header: string) => {
    const key = PAYROLL_SORT_KEYS[header];
    const label = t(PAYROLL_TABLE_HEADER_LABEL_KEYS[header] ?? header);
    if (!key) return <span>{label}</span>;
    return <button type="button" onClick={() => handleSort(key)} className="motion-safe:transition-all motion-safe:duration-base ease-in-out inline-flex min-h-11 items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" aria-label={t('admin_hr_payroll_table.auto_sortBy', { header })}  data-testid="admin_hr-admin_hr-payroll-table-click">{header}<AdminHrPayrollSortIndicator active={payrollSortKey === key} direction={payrollSortDir} /></button>;
  };

  if (status === 'pending') return <div className="flex flex-col h-full"><div className="overflow-x-auto flex-1"><table data-admin-responsive-table className="w-full"><thead className="bg-input text-secondary"><tr>{PAYROLL_TABLE_HEADERS.map((header) => <th key={header} aria-sort={PAYROLL_SORT_KEYS[header] && payrollSortKey === PAYROLL_SORT_KEYS[header] ? (payrollSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t('hr.admin_hr_payroll_table.text_c3cd636a58')}</th></tr></thead><tbody className="divide-y divide-border">{['payroll-skeleton-1','payroll-skeleton-2','payroll-skeleton-3','payroll-skeleton-4','payroll-skeleton-5'].map((key) => <tr key={key} className="motion-safe:animate-pulse bg-card motion-safe:duration-base">{['a','b','c','d','e','f','g','h'].map((cell) => <td key={`${key}-${cell}`} className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td>)}<td className="px-4 py-4"><div className="h-8 bg-skeleton-base rounded w-24 ml-auto" /></td></tr>)}</tbody></table></div></div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4"><button type="button" onClick={() => setShowPayrollModal(true)} className="min-h-11 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-w-11 motion-safe:active:scale-95" data-testid="admin_hr-admin_hr-payroll-table-click-2">{t('hr.admin_hr_payroll_table.text_3a5a144258')}</button></div>
      <div className="overflow-x-auto flex-1"><table data-admin-responsive-table className="w-full"><thead className="bg-input text-secondary"><tr>{PAYROLL_TABLE_HEADERS.map((header) => <th key={header} aria-sort={PAYROLL_SORT_KEYS[header] && payrollSortKey === PAYROLL_SORT_KEYS[header] ? (payrollSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t('hr.admin_hr_payroll_table.text_c3cd636a58')}</th></tr></thead><tbody className="divide-y divide-border">
        {payrolls.map((payroll , __testIdIndex45) => { const salary = staff.find((member) => member.id === payroll.staffId)?.salary ?? 0; return <tr key={payroll.id} className="motion-safe:transition-colors hover:bg-surface-hover bg-card motion-safe:duration-base"><td className="px-4 py-3"><p className="text-sm font-medium text-primary">{payroll.staff?.name || t('admin_hr_payroll_table.auto_staffFallback', { id: payroll.staffId })}</p><div className="text-xs text-secondary">{payroll.staff?.role}</div></td><td className="px-4 py-3 text-sm text-primary">{payroll.month}</td><td className="px-4 py-3 text-sm font-medium text-right">{AdminHrFormatCurrency(salary, undefined, locale)}</td><td className="px-4 py-3 text-sm font-bold text-primary text-right">{AdminHrFormatCurrency(payroll.amount || 0, undefined, locale)}</td><td className="px-4 py-3 text-sm font-bold text-success text-right">{AdminHrFormatCurrency(payroll.paidAmount || 0, undefined, locale)}</td><td className="px-4 py-3 text-sm font-bold text-danger text-right">{AdminHrFormatCurrency(payroll.pendingAmount || 0, undefined, locale)}</td><td className="px-4 py-3"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${payroll.status.toLowerCase() === PAYROLL_STATUS.PAID.toLowerCase() ? 'bg-success-bg text-success-text' : 'bg-warning-bg text-warning'}`} data-testid={`admin_hr-adminhrpayrolltable-status-1-map45-${__testIdIndex45}-1`}>{PAYROLL_STATUS_LABEL_KEYS[payroll.status.toUpperCase()] ? t(PAYROLL_STATUS_LABEL_KEYS[payroll.status.toUpperCase()]) : payroll.status}</span></td><td className="px-4 py-3 text-sm text-secondary">{payroll.paidAt ? formatDate(payroll.paidAt, locale) : displayValue(null)}</td><td className="px-4 py-3 text-right"><div className="flex justify-end gap-2">{payroll.status.toLowerCase() !== PAYROLL_STATUS.PAID.toLowerCase() && <button type="button" onClick={() => setPaymentModal({ payrollId: payroll.id, staffName: payroll.staff?.name || t('admin_hr_payroll_table.auto_staffFallback', { id: payroll.staffId }), pendingAmount: payroll.pendingAmount })} className="min-h-11 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-w-11 motion-safe:active:scale-95" aria-label={t('admin_hr_payroll_table.auto_payStaff', { name: payroll.staff?.name ?? payroll.staffId })} data-testid={`admin_hr-admin_hr-payroll-table-click-3-map45-${__testIdIndex45}-2`}><CheckCircle2 size={18}  strokeWidth={2}/> {t('hr.admin_hr_payroll_table.text_80c37573af')}</button>}</div></td></tr>; })}
        {payrolls.length === 0 && <tr><td colSpan={PAYROLL_TABLE_HEADERS.length + 1}><AdminHrEmptyState title={t('hr.admin_hr_payroll_table.text_83248dc119')} description={t('hr.admin_hr_payroll_table.auto_05f817cba7')} /></td></tr>}
      </tbody></table></div>
      <AdminLayoutPagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil(totalPayrolls / HR_ITEMS_PER_PAGE))} totalItems={totalPayrolls} itemsPerPage={HR_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
