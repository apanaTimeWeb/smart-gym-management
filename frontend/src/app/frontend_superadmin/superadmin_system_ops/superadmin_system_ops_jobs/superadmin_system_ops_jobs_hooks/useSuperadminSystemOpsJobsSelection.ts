'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsJobsSelection, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
import { useState } from 'react';

import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';

/** Owns UI-only job row selection and inspection state; server data remains in TanStack Query. */
/** Purpose: Owns the useSuperadminSystemOpsJobsSelection data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsJobsSelection() {
  const [selectedJobIds, setSelectedJobIds] = useState<Set<string>>(new Set());
  const [inspectJob, setInspectJob] = useState<BackgroundJob | null>(null);
  function toggleSelection(id: string) {
    setSelectedJobIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  function toggleAll(visibleIds: string[]) {
    setSelectedJobIds(new Set(selectedJobIds.size === visibleIds.length && visibleIds.length > 0 ? [] : visibleIds));
  }
  return { selectedJobIds, setSelectedJobIds, inspectJob, setInspectJob, toggleSelection, toggleAll };
}
