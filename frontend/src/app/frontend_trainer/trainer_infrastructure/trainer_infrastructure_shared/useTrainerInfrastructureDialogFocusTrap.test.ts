import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/useTrainerInfrastructureDialogFocusTrap';





describe('useTrainerInfrastructureDialogFocusTrap', () => {
  it('focuses the first control, wraps Tab, handles Escape, and restores the trigger focus', () => {
    const trigger = document.createElement('button');
    const first = document.createElement('button');
    const last = document.createElement('button');
    const dialog = document.createElement('div');
    dialog.append(first, last);
    document.body.append(trigger, dialog);
    trigger.focus();
    const onEscape = vi.fn();
    const dialogRef = { current: dialog };

    const { rerender } = renderHook((isOpen: boolean) => useTrainerInfrastructureDialogFocusTrap({ isOpen, dialogRef, onEscape }), { initialProps: false });
    rerender(true);

    expect(document.activeElement).toBe(first);

    last.focus();
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' })));
    expect(document.activeElement).toBe(first);

    first.focus();
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true })));
    expect(document.activeElement).toBe(last);

    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(onEscape).toHaveBeenCalledTimes(1);

    rerender(false);
    expect(document.activeElement).toBe(trigger);
    dialog.remove();
    trigger.remove();
  });
});
