import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';



describe('useSuperadminLayoutUnsavedChangesGuard', () => {
  it('blocks browser exit when the form is dirty and removes listeners when clean', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const { rerender, unmount } = renderHook(({ dirty }) => useSuperadminLayoutUnsavedChangesGuard(dirty, 'Unsaved'), { initialProps: { dirty: true } });
    const event = new Event('beforeunload', { cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    rerender({ dirty: false });
    unmount();
    expect(confirmSpy).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });
});
