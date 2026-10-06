import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CANCELLATIONS_WIN_BACK_TEMPLATES } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { useManagerCommunicationsChurnRecoveryComposerState } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsChurnRecoveryComposerState';

describe('useManagerCommunicationsChurnRecoveryComposerState', () => {
  it('hydrates the draft from the selected tier', () => {
    const tier = Object.keys(CANCELLATIONS_WIN_BACK_TEMPLATES)[0] as keyof typeof CANCELLATIONS_WIN_BACK_TEMPLATES;
    const { result } = renderHook(() => useManagerCommunicationsChurnRecoveryComposerState(null, tier));
    expect(result.current.message).toBe(CANCELLATIONS_WIN_BACK_TEMPLATES[tier].message);
  });
});
