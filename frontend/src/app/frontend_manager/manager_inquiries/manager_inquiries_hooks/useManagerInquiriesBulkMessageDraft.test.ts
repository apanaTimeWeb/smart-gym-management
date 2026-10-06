import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useManagerInquiriesBulkMessageDraft } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesBulkMessageDraft';

describe('useManagerInquiriesBulkMessageDraft', () => {
  it('reinitializes message and recipients when opened', () => {
    const { result, rerender } = renderHook(({ open, message }) => useManagerInquiriesBulkMessageDraft(open, message), { initialProps: { open: false, message: 'Default' } });
    act(() => result.current.setMessage('Draft'));
    act(() => result.current.setOpenedRecipientKeys(new Set(['a'])));
    rerender({ open: true, message: 'Updated' });
    expect(result.current.message).toBe('Updated');
    expect(result.current.openedRecipientKeys.size).toBe(0);
  });
});
