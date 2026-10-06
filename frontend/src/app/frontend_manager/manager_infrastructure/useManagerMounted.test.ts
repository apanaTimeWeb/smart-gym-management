import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useManagerMounted } from '@/app/frontend_manager/manager_infrastructure/useManagerMounted';

describe('useManagerMounted', () => {
  it('becomes true after mount', () => {
    const { result } = renderHook(() => useManagerMounted());
    expect(result.current).toBe(true);
  });
});
