import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminBroadcastsBroadcastQueueState } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastQueueState';



describe('useSuperadminBroadcastsBroadcastQueueState', () => {
  it('keeps queue modal, recipients, broadcast identity, and title as local UI state', () => {
    const { result } = renderHook(() => useSuperadminBroadcastsBroadcastQueueState());
    act(() => {
      result.current.setQueueModalOpen(true);
      result.current.setQueueBroadcastId('b-1');
      result.current.setQueueTitle('April campaign');
      result.current.setQueueRecipients([{ id: 'r-1', tenantId: 'gym-1', status: 'PENDING' }] as never);
    });
    expect(result.current.queueModalOpen).toBe(true);
    expect(result.current.queueBroadcastId).toBe('b-1');
    expect(result.current.queueTitle).toBe('April campaign');
    expect(result.current.queueRecipients).toHaveLength(1);
  });
});
