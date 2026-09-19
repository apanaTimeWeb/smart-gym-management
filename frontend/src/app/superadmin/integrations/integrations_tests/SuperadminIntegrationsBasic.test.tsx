import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SuperadminIntegrationsClient from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsClient';
import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/superadmin/integrations/integrations_mocks/fixtures/SuperadminIntegrationsMockFixtures';
import { useSuperadminIntegrationsPage } from '@/app/superadmin/integrations/integrations_utils/useSuperadminIntegrationsPage';
vi.mock('@/app/superadmin/integrations/integrations_utils/useSuperadminIntegrationsPage', () => ({ useSuperadminIntegrationsPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminIntegrationsPage);
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
        const { unmount } = render(<SuperadminIntegrationsClient />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminIntegrationsClient />);
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
        render(<SuperadminIntegrationsClient />);
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
        render(<SuperadminIntegrationsClient />);
        expect(screen.getByText('Connections')).toBeInTheDocument();
        expect(screen.getByText('Webhook deliveries')).toBeInTheDocument();
        expect(screen.getByText('Developer access')).toBeInTheDocument();
    });
});
