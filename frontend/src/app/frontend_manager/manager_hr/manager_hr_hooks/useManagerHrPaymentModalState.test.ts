import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useManagerHrPaymentModalState } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrPaymentModalState';

describe('useManagerHrPaymentModalState', () => {
  it('hydrates the amount from pending minor units', () => {
    const { result } = renderHook(() => useManagerHrPaymentModalState({ payrollId: 'p1', staffName: 'A', pendingAmount: 125000 } as never));
    expect(result.current.amount).toBe(1250);
  });
});
