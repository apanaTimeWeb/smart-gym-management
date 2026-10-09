import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useTrainerAttendanceFilters } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_hooks/useTrainerAttendanceFilters';

import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_url_config';






const push = vi.fn();
const pathname = TRAINER_ATTENDANCE_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace: push }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); params = new URLSearchParams(); });

describe('useTrainerAttendanceFilters', () => {
  it('updates shareable URL state from a user action', () => {
    const { result } = renderHook(() => useTrainerAttendanceFilters());
    act(() => { result.current.setSearch("Rahul"); });
    expect(push).toHaveBeenCalledWith(expect.stringContaining("search=Rahul"), { scroll: false });
  });
});
