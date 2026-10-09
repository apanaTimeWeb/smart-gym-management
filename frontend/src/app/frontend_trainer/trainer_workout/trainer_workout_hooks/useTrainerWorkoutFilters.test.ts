import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_workout/trainer_workout_hooks/useTrainerWorkoutFilters';

import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_url_config';






const push = vi.fn();
const pathname = TRAINER_WORKOUT_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace: push }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); params = new URLSearchParams(); });

describe('useTrainerWorkoutFilters', () => {
  it('updates shareable URL state from a user action', () => {
    const { result } = renderHook(() => useTrainerWorkoutFilters());
    act(() => { result.current.setSearch("Rahul"); });
    expect(push).toHaveBeenCalledWith(expect.stringContaining("search=Rahul"), { scroll: false });
  });
});
