import { describe, expect, it } from 'vitest';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/superadmin_messaging_api';

describe('Superadmin messaging API contract', () => {
  it('exposes all server operations consumed by the page', () => {
    expect(typeof superadminMessagingApi.fetchMessages).toBe('function');
    expect(typeof superadminMessagingApi.fetchNotifications).toBe('function');
    expect(typeof superadminMessagingApi.fetchTenants).toBe('function');
    expect(typeof superadminMessagingApi.sendMessage).toBe('function');
    expect(typeof superadminMessagingApi.markNotificationRead).toBe('function');
    expect(typeof superadminMessagingApi.markAllNotificationsRead).toBe('function');
  });
});
