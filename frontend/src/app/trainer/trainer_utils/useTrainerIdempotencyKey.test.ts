import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';

describe('useTrainerIdempotencyKey', () => {
  it('reuses a key for the same action but isolates different actions', () => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => `key-${Math.random()}`) });
    const { result } = renderHook(() => useTrainerIdempotencyKey());
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
