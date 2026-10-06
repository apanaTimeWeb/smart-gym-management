// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerNotificationsApi } from '@/app/frontend_manager/manager_notifications/manager_notifications_api/ManagerNotificationsApi';
import ManagerNotificationsMain from '@/app/frontend_manager/manager_notifications/manager_notifications_components/manager_notifications_main/ManagerNotificationsMain';
import { ManagerNotificationsUrlConfig } from '@/app/frontend_manager/manager_notifications/manager_notifications_url_config';

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
    const response = await ManagerNotificationsApi.fetchManagerNotifications({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.notifications?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the notifications empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerNotificationsUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { notifications: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerNotificationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('No notifications found')).toBeInTheDocument();
  });

  it('renders the notifications error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerNotificationsUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
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
