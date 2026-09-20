'use client';
import { useState } from 'react';
import type { BackgroundJob } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsTypes';

/** Owns UI-only job row selection and inspection state; server data remains in TanStack Query. */
export function useSuperadminJobsSelection() {
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
