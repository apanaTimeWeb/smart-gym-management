import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { notificationsApi } from '@/app/manager/notifications/notifications_api/ManagerNotificationsApi';
import ManagerNotificationsMain from '@/app/manager/notifications/notifications_components/ManagerNotificationsMain/ManagerNotificationsMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Notifications user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerNotificationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Notifications')).toBeInTheDocument();
    expect(await screen.findByText('Membership Expiring Soon')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await notificationsApi.fetchManagerNotifications({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.notifications?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the notifications empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/notifications', () => HttpResponse.json({ success: true, message: 'Empty result', data: { notifications: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerNotificationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('No notifications found')).toBeInTheDocument();
  });

  it('renders the notifications error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/notifications', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerNotificationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Failed to load notifications')).toBeInTheDocument();
  });

  it('proves notification search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerNotificationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Membership Expiring Soon')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search notifications...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Notification');
    expect(await screen.findByText('No notifications found')).toBeInTheDocument();
  });

});
