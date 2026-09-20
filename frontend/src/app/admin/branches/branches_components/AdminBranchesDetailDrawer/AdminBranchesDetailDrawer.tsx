"use client";
// RESPONSIBILITY: Renders the selected branch detail drawer from TanStack Query server state, including loading, empty, error, retry, and view-specific states.
import { useEffect } from 'react';
import { Building2, TrendingUp, TrendingDown, Users, Activity, X, RefreshCw } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/admin/branches/branches_context/useAdminBranchesLogic';
import { BRANCH_DETAIL_TITLES, BRANCH_PAYMENT_METHOD_STYLES, BRANCH_STATUS_STYLES } from '@/app/admin/branches/branches_utils/AdminBranchesSharedConstants';
import { formatCurrency } from '@/lib/formatters';
import type { DetailView } from '@/app/admin/branches/branches_types/AdminBranchesUiTypes';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

import AdminBranchesDetailContent from '@/app/admin/branches/branches_components/AdminBranchesDetailContent/AdminBranchesDetailContent';
import AdminBranchesDetailLoading from '@/app/admin/branches/branches_components/AdminBranchesDetailLoading/AdminBranchesDetailLoading';

export default function AdminBranchesDetailDrawer() {
  const {
    selectedBranch: branch,
    detailView,
    closeDetail,
    detailStatus,
    detailError,
    retryDetail,
  } = useAdminBranchesLogic();

// EFFECT: Synchronizes this component effect with its declared React dependencies in branches/branches_components/AdminBranchesDetailDrawer/AdminBranchesDetailDrawer.tsx.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail();
    };
    if (branch && detailView) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [branch, closeDetail, detailView]);

  if (!branch || !detailView) return null;

  return (
    <>
      <button type="button" aria-label="Close branch details" className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out fixed inset-0 z-40 cursor-default bg-overlay backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={closeDetail} />
      <aside role="dialog" aria-modal="true" aria-labelledby="admin-branches-detail-title" className="fixed right-0 top-0 z-40 flex h-full w-full max-w-lg flex-col border-l border-border bg-overlay shadow-dialog">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="min-w-0">
            <h2 id="admin-branches-detail-title" className="text-lg font-bold text-primary">{BRANCH_DETAIL_TITLES[detailView]}</h2>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-secondary"><Building2 size={13} aria-hidden="true" /> {branch.name}</p>
          </div>
          <button type="button" onClick={closeDetail} aria-label="Close branch details" className="min-h-11 min-w-11 rounded-lg bg-input p-2 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base">
            <X size={16} className="mx-auto text-secondary" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {detailStatus === 'pending' && <AdminBranchesDetailLoading />}
          {detailStatus === 'error' && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-input px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-bg"><TrendingDown size={22} className="text-danger" aria-hidden="true" /></div>
              <h3 className="mt-4 text-sm font-semibold text-primary">Unable to load branch details</h3>
              <p className="mt-1 text-xs text-secondary">{detailError instanceof Error ? detailError.message : 'Please try again.'}</p>
              <button type="button" onClick={() => void retryDetail()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <RefreshCw size={15} aria-hidden="true" /> Retry
              </button>
            </div>
          )}
          {detailStatus === 'success' && <AdminBranchesDetailContent branch={branch} view={detailView} />}
        </div>
      </aside>
    </>
  );
}
