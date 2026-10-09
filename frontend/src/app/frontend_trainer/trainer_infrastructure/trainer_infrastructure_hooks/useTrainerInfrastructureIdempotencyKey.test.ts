import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey';





describe('useTrainerInfrastructureIdempotencyKey', () => {
  it('reuses a key for the same action but isolates different actions', () => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => `key-${Math.random()}`) });
    const { result } = renderHook(() => useTrainerInfrastructureIdempotencyKey());
    let first = '';
    let second = '';
    let other = '';
    act(() => { first = result.current.begin('delete-1'); });
    act(() => { second = result.current.begin('delete-1'); });
    act(() => { other = result.current.begin('delete-2'); });
    expect(first).toBe(second);
    expect(other).not.toBe(first);
    act(() => { result.current.clear('delete-1'); });
    expect(result.current.current('delete-1')).toBeNull();
  });
});
