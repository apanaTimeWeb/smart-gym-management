import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsJobsSelection } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsSelection';



describe('useSuperadminSystemOpsJobsSelection', () => {
  it('toggles individual job selection and then selects exactly the visible set', () => {
    const { result } = renderHook(() => useSuperadminSystemOpsJobsSelection());
    act(() => result.current.toggleSelection('job-1'));
    expect([...result.current.selectedJobIds]).toEqual(['job-1']);
    act(() => result.current.toggleAll(['job-1', 'job-2']));
    expect([...result.current.selectedJobIds].sort()).toEqual(['job-1', 'job-2']);
    act(() => result.current.toggleAll(['job-1', 'job-2']));
    expect(result.current.selectedJobIds.size).toBe(0);
  });
});
