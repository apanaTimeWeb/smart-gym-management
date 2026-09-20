import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { managerSettingsApi } from '@/app/manager/settings/settings_api/ManagerSettingsApi';
import ManagerSettingsMain from '@/app/manager/settings/settings_components/ManagerSettingsMain/ManagerSettingsMain';
import { resetManagerSettingsMockState } from '@/app/manager/settings/settings_mocks/handlers/ManagerSettingsMockHandlers';
import { ManagerSettingsUrlConfig } from '@/app/manager/settings/settings_url_config';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetManagerSettingsMockState());
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Settings user-visible behavior', () => {
  it('renders real feature data through module MSW', async () => {
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    expect(await screen.findByText('App Settings')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Smart Gym')).toBeInTheDocument();
  });

  it('saves an edited setting and keeps the authoritative server response in the visible form', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    const nameField = await screen.findByDisplayValue('Smart Gym');
    await user.clear(nameField);
    await user.type(nameField, 'Smart Gym Updated');
    await user.click(screen.getByRole('button', { name: 'Save Settings' }));
    await waitFor(() => expect(screen.getByDisplayValue('Smart Gym Updated')).toBeInTheDocument());
    const response = await managerSettingsApi.fetchSettings();
    expect(response.data?.gymProfile.gymName).toBe('Smart Gym Updated');
  });

  it('renders the standardized query error and retry control', async () => {
    managerMswServer.use(http.get(ManagerSettingsUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: false, message: 'Settings temporarily unavailable', data: null }, { status: 500 })));
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Settings temporarily unavailable');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('supports changing the active settings tab', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSettingsMain /></ManagerTestProviders>);
    await screen.findByDisplayValue('Smart Gym');
    await user.click(screen.getByRole('tab', { name: 'Membership Settings' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Grace Period');
  });
});
