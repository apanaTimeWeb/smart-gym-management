"use client";
// RESPONSIBILITY: Renders the grid of membership plan cards with edit/delete actions and pagination.
import { useLocale, useTranslations } from 'next-intl';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_plans/admin_plans_utils/AdminPlansFormatCurrency';

import { Edit2, Trash2, Tag, CheckCircle, Loader2, Snowflake } from 'lucide-react';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import type { PlansContextType } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import { PLANS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansConstants';
import type { AdminPlansGridProps } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansGridPropsTypes';


/**
 * AdminPlansGrid renders the admin plans grid UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPlansGrid: Renders the grid of membership plan cards with edit/delete actions and pagination.
 * @dependencies Consumes AdminPlansFormatCurrency, useAdminLayoutConfirm, AdminPlansTypes, useAdminPlansStore, AdminLayoutPagination.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPlansGrid({ logic }: AdminPlansGridProps) {
  const locale = useLocale();
  const t = useTranslations();

  const { plans, totalItems, totalPages, status, currentPage, setCurrentPage, openEdit, deletePlan } = logic;

  // Search/tier/pagination are server-backed; this component renders the query result directly.
  const currentData = plans;


  if (status === 'pending') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {["row-1", "row-2", "row-3"].map((i) => (
          <div key={`plans-grid-skeleton-${i}`} className="h-96 bg-skeleton-base rounded-2xl border border-border motion-safe:animate-pulse motion-safe:duration-base"></div>
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-border">
        <p className="text-danger font-medium">{t('plans.admin_plans_grid.text_2122500ef6')}</p>
        <p className="text-sm mt-1 text-secondary">{t('plans.admin_plans_grid.text_11ee134422')}</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-border">
        <p className="text-secondary">{t('plans.admin_plans_grid.text_a05fc9f95b')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {currentData.map((p, i) => (
          <div
            key={p.id}
            className={`bg-card border-2 rounded-2xl p-6 relative motion-safe:transition-all motion-safe:hover:scale-105 motion-safe:hover:-translate-y-1 ${
              i === 1 ? 'border-border shadow-card' : 'border-border'
            }`}
          >
            {i === 1 && (
              <div className="bg-warning-bg text-warning text-xs font-bold uppercase tracking-wider text-center py-1 absolute top-0 w-full left-0 rounded-t-2xl" data-testid={`admin_plans-adminplansgrid-status-1-map61-${i}-1`}>
                {t('plans.admin_plans_grid.text_385b4b232f')}</div>
            )}
            <div className={`p-6 ${i === 1 ? 'pt-8' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{p.name}</h3>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-input text-secondary mt-1">
                    {p.tier}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button type="button"
                    onClick={() => openEdit(p)}
                    className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out motion-safe:active:scale-95"
                    title={t('plans.admin_plans_grid.text_13a7a7c3a7')}
                    aria-label={t('admin_plans_grid.auto_edit', { name: p.name })}
                   data-testid={`admin_plans-admin_plans-grid-click-map61-${i}-2`}>
                    <Edit2 size={18}  strokeWidth={2}/>
                  </button>
                  <button type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlan(p.id);
                  }}
                    className="min-h-11 min-w-11 p-1.5 rounded-lg text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out motion-safe:active:scale-95"
                    title={t('plans.admin_plans_grid.text_75cd512896')}
                    aria-label={t('admin_plans_grid.auto_delete', { name: p.name })}
                   data-testid={`admin_plans-admin_plans-grid-click-2-map61-${i}-3`}>
                    <Trash2 size={18}  strokeWidth={2}/>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 bg-input p-4 rounded-xl">
                <div>
                  <p className="text-xs text-secondary">{t('plans.admin_plans_grid.text_7b01bcf516')}</p>
                  <p className="font-bold text-primary">{AdminPlansFormatCurrency(p.price1Month, undefined, locale)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">{t('plans.admin_plans_grid.text_8ce49e113d')}</p>
                  <p className="font-bold text-primary">{AdminPlansFormatCurrency(p.price3Month, undefined, locale)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">{t('plans.admin_plans_grid.text_422c023cc8')}</p>
                  <p className="font-bold text-primary">{AdminPlansFormatCurrency(p.price6Month, undefined, locale)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">{t('plans.admin_plans_grid.text_2de83657ff')}</p>
                  <p className="font-bold text-success">{AdminPlansFormatCurrency(p.price12Month, undefined, locale)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Tag size={18}  strokeWidth={2}/> {t('plans.admin_plans_grid.text_fc338f87a0')}</p>
                <ul className="space-y-2.5">
                  {p.features.map((feature) => (
                    <li key={`${p.id}-${feature}`} className="flex items-start gap-2 text-sm text-secondary">
                      <CheckCircle size={18} className="text-success flex-shrink-0 mt-0.5"  strokeWidth={2}/>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {p.freezeAllowed && (
                    <li className="flex items-start gap-2 text-sm text-secondary">
                      <Snowflake size={18} className="text-info flex-shrink-0 mt-0.5"  strokeWidth={2}/>
                      <span>{t('plans.admin_plans_grid.text_7346564378')}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <AdminLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={PLANS_ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
