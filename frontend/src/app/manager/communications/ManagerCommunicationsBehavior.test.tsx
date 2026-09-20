import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import ManagerCommunicationsMain from '@/app/manager/communications/communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Communications user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Communications')).toBeInTheDocument();
    expect(await screen.findByText('June Renewal Reminder')).toBeInTheDocument();
  });
  it('renders the real composer and recipient summary from module queries', async () => {
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Quick Templates')).toBeInTheDocument();
    expect(await screen.findByText(/recipient/)).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerCommunicationsApi.fetchCampaigns({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.campaigns?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the communications empty history state from MSW', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/communications/campaigns', () => HttpResponse.json({ success: true, message: 'Empty result', data: { campaigns: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('No campaigns yet')).toBeInTheDocument();
  });

  it('renders the communications error state from MSW', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/communications/campaigns', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Unable to load campaigns.')).toBeInTheDocument();
  });

  it('proves campaign search changes the rendered history dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('June Renewal Reminder')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search campaigns...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Campaign');
    expect(await screen.findByText('No campaigns yet')).toBeInTheDocument();
  });

  it('renders the empty campaign state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/communications/campaigns', () => HttpResponse.json({ success: true, message: 'Empty result', data: { campaigns: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('No campaigns yet')).toBeInTheDocument();
  });

});
