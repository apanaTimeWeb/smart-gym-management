import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SuperadminComplianceClient from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceClient';
import { SUPERADMIN_COMPLIANCE_MOCK_FIXTURE } from '@/app/superadmin/compliance/compliance_mocks/fixtures/SuperadminComplianceMockFixtures';
import { useSuperadminCompliancePage } from '@/app/superadmin/compliance/compliance_utils/useSuperadminCompliancePage';
vi.mock('@/app/superadmin/compliance/compliance_utils/useSuperadminCompliancePage', () => ({ useSuperadminCompliancePage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminCompliancePage);
describe('Superadmin Tax & Compliance', () => {
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
        const { unmount } = render(<SuperadminComplianceClient />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_COMPLIANCE_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminComplianceClient />);
        expect(screen.getByText('Tax & Compliance')).toBeInTheDocument();
        expect(screen.getAllByText('FitLife Andheri')[0]).toBeInTheDocument();
        expect(screen.getAllByText('—')[0]).toBeInTheDocument();
    });
    it('surfaces a retryable error state', () => {
        const refetch = vi.fn();
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
            refetch,
        });
        render(<SuperadminComplianceClient />);
        expect(screen.getByRole('alert')).toHaveTextContent('Compliance data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when regional and document lists are empty', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_COMPLIANCE_MOCK_FIXTURE, regions: [], documents: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminComplianceClient />);
        expect(screen.getByText('Regional coverage')).toBeInTheDocument();
        expect(screen.getByText('Compliance documents')).toBeInTheDocument();
    });
});
