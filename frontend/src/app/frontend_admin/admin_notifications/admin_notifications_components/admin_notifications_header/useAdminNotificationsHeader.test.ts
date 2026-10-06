import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminNotificationsHeader } from '@/app/frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_header/useAdminNotificationsHeader';

describe('useAdminNotificationsHeader', () => {
  it('dismisses the notification popover on an outside click', () => {
    const { result } = renderHook(() => useAdminNotificationsHeader());
    act(() => result.current.setShowNotifications(true));
    expect(result.current.showNotifications).toBe(true);

    act(() => {
      document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(result.current.showNotifications).toBe(false);
  });

  it('keeps the popover open for clicks inside its ref', () => {
    const { result } = renderHook(() => useAdminNotificationsHeader());
    act(() => result.current.setShowNotifications(true));
    const inside = document.createElement('div');
    result.current.notifRef.current = inside;
    document.body.appendChild(inside);
    act(() => inside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })));
    expect(result.current.showNotifications).toBe(true);
    inside.remove();
  });
});
