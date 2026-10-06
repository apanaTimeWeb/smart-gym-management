// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerProfileApi } from '@/app/frontend_manager/manager_profile/manager_profile_api/ManagerProfileApi';
import ManagerProfileMain from '@/app/frontend_manager/manager_profile/manager_profile_components/manager_profile_main/ManagerProfileMain';
import { ManagerProfileUrlConfig } from '@/app/frontend_manager/manager_profile/manager_profile_url_config';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Profile user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerProfileMain /></ManagerTestProviders>);
    expect(await screen.findByText('My Profile')).toBeInTheDocument();
  });
  it('loads profile data and submits the RHF profile form through MSW', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerProfileMain /></ManagerTestProviders>);
    const name = await screen.findByLabelText('Full Name *');
    await user.clear(name);
    await user.type(name, 'Updated Manager');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(await screen.findByText('Updated Manager')).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerProfileApi.fetchProfile();
    expect(response.success).toBe(true);
    expect(response.data?.name).toBeTruthy();
  });

  it('renders the module error state from an MSW failure', async () => {
    const { http, HttpResponse } = await import('msw');
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerProfileUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerTestProviders><ManagerProfileMain /></ManagerTestProviders>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load profile.');
  });

});
