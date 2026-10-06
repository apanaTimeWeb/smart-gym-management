"use client";
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useAdminLayoutDialogAccessibility } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutDialogAccessibility';

beforeEach(() => {
  window.requestAnimationFrame = ((callback: FrameRequestCallback) => { callback(0); return 1; }) as typeof window.requestAnimationFrame;
  window.cancelAnimationFrame = (() => {}) as typeof window.cancelAnimationFrame;
});

afterEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

describe('useAdminLayoutDialogAccessibility', () => {
  it('closes an open dialog on Escape and restores body scroll state', () => {
    const container = document.createElement('div');
    container.tabIndex = -1;
    document.body.appendChild(container);
    const onClose = vi.fn();
    const ref = { current: container };
    const { rerender } = renderHook(({ open }) => useAdminLayoutDialogAccessibility({ isOpen: open, containerRef: ref, onClose }), { initialProps: { open: true } });
    expect(document.body.style.overflow).toBe('hidden');
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(onClose).toHaveBeenCalledTimes(1);
    rerender({ open: false });
    expect(document.body.style.overflow).toBe('');
  });
});
