import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useTrainerProgressTrackingFilters } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingFilters';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_url_config';






const push = vi.fn();
const pathname = TRAINER_PROGRESS_TRACKING_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace: push }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); params = new URLSearchParams(); });

describe('useTrainerProgressTrackingFilters', () => {
  it('updates shareable URL state from a user action', () => {
    const { result } = renderHook(() => useTrainerProgressTrackingFilters());
    act(() => { result.current.setCurrentPage(2); });
    expect(push).toHaveBeenCalledWith(expect.stringContaining("page=2"));
  });
});
