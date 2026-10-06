"use client";
// RESPONSIBILITY: Renders the paginated, searchable, sortable Admin plan revenue table.
import { useLocale, useTranslations } from 'next-intl';

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown, FileWarning } from 'lucide-react';
import { REVENUE_TABLE_HEADERS } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansConstants';
import type { PlanRevenueRecord, RevenueSortDirection, RevenueSortKey } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansFormatters';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import AdminPlansEmptyState from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_empty_state/AdminPlansEmptyState';

import type { AdminPlansRevenueTableProps } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTablePropsTypes';


import AdminPlansRevenueTableSortIcon from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_revenue/AdminPlansRevenueTableSortIcon';
/**
 * AdminPlansRevenueTable renders the admin plans revenue table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPlansRevenueTable: Renders the paginated, searchable, sortable Admin plan revenue table.
 * @dependencies Consumes AdminPlansConstants, AdminPlansRevenueTypes, AdminPlansFormatCurrency, AdminPlansFormatters, AdminLayoutPagination.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPlansRevenueTable({data,sortKey,sortDir,onSort,currentPage,totalPages,totalItems,onPageChange}:AdminPlansRevenueTableProps){
  const locale = useLocale();
  const t = useTranslations();
return <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col"><div className="overflow-x-auto"><table data-admin-responsive-table className="w-full text-left border-collapse"><thead><tr className="bg-surface-highlight border-b border-border">{REVENUE_TABLE_HEADERS.map((h, __testIdIndex27) =><th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={h.key} onClick={()=>h.sortable&&onSort(h.key as RevenueSortKey)} className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${h.sortable?'cursor-pointer':''}`} aria-sort={sortKey===h.key?(sortDir==='asc'?'ascending':'descending'):'none'} data-testid={`admin_plans-admin_plans-revenue-table-control-map27-${__testIdIndex27}-1`}><div className="flex items-center gap-1.5">{t(h.labelKey)}{h.sortable&& <AdminPlansRevenueTableSortIcon column={h.key as RevenueSortKey} sortKey={sortKey} sortDir={sortDir}/>}</div></th>)}</tr></thead><tbody className="divide-y divide-border">{data.length===0?<tr><td colSpan={6}><AdminPlansEmptyState title={t('plans.AdminPlansRevenueTable.text_6a50bf56d9')} description={t('plans.AdminPlansRevenueTable.auto_7a5702dc84')} /></td></tr>:data.map(row=><tr key={row.id} className="hover:bg-input motion-safe:transition-colors motion-safe:duration-base"><td className="px-4 py-3.5 text-sm font-semibold text-primary">{row.planName}</td><td className="px-4 py-3.5"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary">{row.tier}</span></td><td className="px-4 py-3.5 text-sm font-medium text-primary">{formatNumber(row.activeSubscriptions, locale)}</td><td className="px-4 py-3.5 text-sm font-medium text-primary">{row.newSignups>0?`+${row.newSignups}`:row.newSignups}</td><td className="px-4 py-3.5 text-sm font-medium text-primary">{formatPercent1dp(row.renewalRate, locale)}%</td><td className="px-4 py-3.5 text-sm font-black text-primary">{AdminPlansFormatCurrency(row.totalRevenue, undefined, locale)}</td></tr>)}</tbody></table></div><div className="border-t border-border px-4 py-3"><AdminLayoutPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={10} onPageChange={onPageChange}/></div></div>}
