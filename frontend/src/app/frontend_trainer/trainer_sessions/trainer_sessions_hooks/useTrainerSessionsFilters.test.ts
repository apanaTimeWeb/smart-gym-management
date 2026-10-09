import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useTrainerSessionsFilters } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_hooks/useTrainerSessionsFilters';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_url_config';






const push = vi.fn();
const pathname = TRAINER_SESSIONS_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace: push }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); params = new URLSearchParams(); });

describe('useTrainerSessionsFilters', () => {
  it('updates shareable URL state from a user action', () => {
    const { result } = renderHook(() => useTrainerSessionsFilters());
    act(() => { result.current.setFilter("PT"); });
    expect(push).toHaveBeenCalledWith(expect.stringContaining("filter=PT"), { scroll: false });
  });
});
