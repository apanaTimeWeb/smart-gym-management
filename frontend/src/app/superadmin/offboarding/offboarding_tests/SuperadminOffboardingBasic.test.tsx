import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SuperadminOffboardingClient from '@/app/superadmin/offboarding/offboarding_components/SuperadminOffboardingClient';
import { SUPERADMIN_OFFBOARDING_MOCK_FIXTURE } from '@/app/superadmin/offboarding/offboarding_mocks/fixtures/SuperadminOffboardingMockFixtures';
import { useSuperadminOffboardingPage } from '@/app/superadmin/offboarding/offboarding_utils/useSuperadminOffboardingPage';
vi.mock('@/app/superadmin/offboarding/offboarding_utils/useSuperadminOffboardingPage', () => ({ useSuperadminOffboardingPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminOffboardingPage);
describe('Superadmin Tenant Offboarding', () => {
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
        const { unmount } = render(<SuperadminOffboardingClient />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_OFFBOARDING_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminOffboardingClient />);
        expect(screen.getByText('Tenant Offboarding')).toBeInTheDocument();
        expect(screen.getByText('FlexFit Thane')).toBeInTheDocument();
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
        render(<SuperadminOffboardingClient />);
        expect(screen.getByRole('alert')).toHaveTextContent('Offboarding data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when queue and export requests are empty', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_OFFBOARDING_MOCK_FIXTURE, queue: [], requests: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminOffboardingClient />);
        expect(screen.getByText('Offboarding queue')).toBeInTheDocument();
        expect(screen.getByText('Export requests')).toBeInTheDocument();
    });
});
