// RESPONSIBILITY: Renders the SuperadminIntegrationsBasic.test UI for the integrations feature. Business/data orchestration is delegated to module-owned hooks.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminIntegrationsMain from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsMain';
import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_mocks/superadmin_integrations_mocks_fixtures/SuperadminIntegrationsMockFixtures';
import { useSuperadminIntegrationsPage } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsPage';

vi.mock('@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_hooks/useSuperadminIntegrationsPage', () => ({ useSuperadminIntegrationsPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminIntegrationsPage);
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const customRender = (ui: React.ReactElement) => render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
describe('Superadmin Integrations & Developer Access', () => {
    beforeEach(() => {
        mockedUsePage.mockReset();
    });
    it('renders loading and real fixture-backed success states', () => {
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: true,
            isError: false,
            refetch: vi.fn(),
        });
        const { unmount } = customRender(<SuperadminIntegrationsMain />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        customRender(<SuperadminIntegrationsMain />);
        expect(screen.getByText('Integrations & Developer Access')).toBeInTheDocument();
        expect(screen.getByText('Razorpay')).toBeInTheDocument();
        expect(screen.getAllByText('—').length).toBeGreaterThan(0);
    });
    it('surfaces a retryable error state', () => {
        const refetch = vi.fn();
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
            refetch,
        });
        customRender(<SuperadminIntegrationsMain />);
        expect(screen.getByRole('alert')).toHaveTextContent('Integrations data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when connection data is empty', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE, integrations: [], webhooks: [], keys: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        customRender(<SuperadminIntegrationsMain />);
        expect(screen.getByText('Connections')).toBeInTheDocument();
        expect(screen.getByText('Webhook deliveries')).toBeInTheDocument();
        expect(screen.getByText('Developer access')).toBeInTheDocument();
    });
});
