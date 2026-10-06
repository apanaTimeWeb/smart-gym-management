import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useManagerCommunicationsBulkMessageDraft } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsBulkMessageDraft';

describe('useManagerCommunicationsBulkMessageDraft', () => {
  it('reinitializes message and recipients when opened', () => {
    const { result, rerender } = renderHook(({ open, message }) => useManagerCommunicationsBulkMessageDraft(open, message), { initialProps: { open: false, message: 'Default' } });
    act(() => result.current.setMessage('Draft'));
    act(() => result.current.setOpenedRecipientKeys(new Set(['a'])));
    rerender({ open: true, message: 'Updated' });
    expect(result.current.message).toBe('Updated');
    expect(result.current.openedRecipientKeys.size).toBe(0);
  });
});
