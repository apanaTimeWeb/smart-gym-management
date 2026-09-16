import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';

describe('Manager unsaved changes guard', () => {
  beforeEach(() => { vi.spyOn(window, 'confirm').mockReturnValue(false); });
  afterEach(() => { vi.restoreAllMocks(); });

  it('blocks beforeunload with the platform warning mechanism', () => {
    renderHook(() => useManagerUnsavedChangesGuard(true));
    const event = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    Object.defineProperty(event, 'returnValue', { writable: true, value: '' });
    window.dispatchEvent(event);
    expect(window.confirm).not.toHaveBeenCalled();
  });

  it('asks for confirmation before same-origin anchor navigation', () => {
    renderHook(() => useManagerUnsavedChangesGuard(true));
    const anchor = document.createElement('a');
    anchor.href = '/manager/dashboard';
    document.body.appendChild(anchor);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    anchor.dispatchEvent(event);
    expect(window.confirm).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
    anchor.remove();
  });
});
