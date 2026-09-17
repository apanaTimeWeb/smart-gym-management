import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerSettingsMain from '@/app/manager/settings/settings_components/ManagerSettingsMain/ManagerSettingsMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { managerSettingsApi } from '@/app/manager/settings/settings_api/ManagerSettingsApi';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

import { http, HttpResponse } from 'msw';
beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Settings user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    expect(await screen.findByText('App Settings')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Smart Gym')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await managerSettingsApi.fetchSettings();
    expect(response.success).toBe(true);
    expect(response.data?.gymProfile?.gymName).toBeTruthy();
  });
it('renders the settings error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/settings', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Unable to load settings. Retry by refreshing this route.')).toBeInTheDocument();
  });

  it('allows a real settings field to be edited without bypassing the form', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    const nameField = await screen.findByDisplayValue('Smart Gym');
    await user.clear(nameField);
    await user.type(nameField, 'Smart Gym Updated');
    expect(nameField).toHaveValue('Smart Gym Updated');
  });

});
