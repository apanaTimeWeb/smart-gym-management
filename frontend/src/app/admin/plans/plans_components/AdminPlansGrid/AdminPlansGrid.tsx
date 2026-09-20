"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders the grid of membership plan cards with edit/delete actions and pagination.

import { Edit2, Trash2, Tag, CheckCircle, Loader2, Snowflake } from 'lucide-react';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import type { PlansContextType } from '@/app/admin/plans/plans_types/AdminPlansTypes';
import { useAdminPlansStore } from '@/app/admin/plans/plans_store/useAdminPlansStore';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import { PLANS_ITEMS_PER_PAGE } from '@/app/admin/plans/plans_utils/AdminPlansSharedConstants';


export default function AdminPlansGrid({ logic }: { logic: PlansContextType }) {
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
      <div className="text-center py-16 bg-card rounded-2xl border border-danger">
        <p className="text-danger font-medium">Failed to load membership plans.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-border">
        <p className="text-secondary">No membership plans created yet.</p>
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
              i === 1 ? 'border-warning shadow-card' : 'border-border'
            }`}
          >
            {i === 1 && (
              <div className="bg-warning-bg text-warning text-xs font-bold uppercase tracking-wider text-center py-1 absolute top-0 w-full left-0 rounded-t-2xl">
                Most Popular
              </div>
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
                  <button
                    onClick={() => openEdit(p)}
                    className="min-h-11 min-w-11 p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                    title="Edit Plan"
                    aria-label={`Edit ${p.name}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlan(p.id);
                  }}
                    className="min-h-11 min-w-11 p-1.5 rounded-lg text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                    title="Delete Plan"
                    aria-label={`Delete ${p.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 bg-input p-4 rounded-xl">
                <div>
                  <p className="text-xs text-secondary">1 Month</p>
                  <p className="font-bold text-primary">{formatCurrency(p.price1Month)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">3 Months</p>
                  <p className="font-bold text-primary">{formatCurrency(p.price3Month)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">6 Months</p>
                  <p className="font-bold text-primary">{formatCurrency(p.price6Month)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">12 Months</p>
                  <p className="font-bold text-success">{formatCurrency(p.price12Month)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Tag size={12} /> Features
                </p>
                <ul className="space-y-2.5">
                  {p.features.map((feature) => (
                    <li key={`${p.id}-${feature}`} className="flex items-start gap-2 text-sm text-secondary">
                      <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {p.freezeAllowed && (
                    <li className="flex items-start gap-2 text-sm text-secondary">
                      <Snowflake size={16} className="text-info flex-shrink-0 mt-0.5" />
                      <span>Freeze Allowed</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <AdminPagination
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
