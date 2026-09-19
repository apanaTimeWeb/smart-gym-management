import { resetSuperadminSegmentsMockState } from '@/app/superadmin/segments/segments_mocks/handlers/SuperadminSegmentsMockHandlers';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SuperadminSegmentsClient from '@/app/superadmin/segments/segments_components/SuperadminSegmentsClient';
import { SUPERADMIN_SEGMENTS_MOCK_FIXTURE } from '@/app/superadmin/segments/segments_mocks/fixtures/SuperadminSegmentsMockFixtures';
import { useSuperadminSegmentsPage } from '@/app/superadmin/segments/segments_utils/useSuperadminSegmentsPage';
vi.mock('@/app/superadmin/segments/segments_utils/useSuperadminSegmentsPage', () => ({ useSuperadminSegmentsPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminSegmentsPage);
beforeEach(() => {
  resetSuperadminSegmentsMockState();
});

describe('Superadmin Saved Tenant Segments', () => {
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
        const { unmount } = render(<SuperadminSegmentsClient />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_SEGMENTS_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminSegmentsClient />);
        expect(screen.getByText('Saved Tenant Segments')).toBeInTheDocument();
        expect(screen.getByText('High Value Gyms')).toBeInTheDocument();
        expect(screen.getByText('—')).toBeInTheDocument();
    });
    it('surfaces a retryable error state', () => {
        const refetch = vi.fn();
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
            refetch,
        });
        render(<SuperadminSegmentsClient />);
        expect(screen.getByRole('alert')).toHaveTextContent('Segments data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when no saved groups or presets exist', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_SEGMENTS_MOCK_FIXTURE, segments: [], presets: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminSegmentsClient />);
        expect(screen.getByText('Saved groups')).toBeInTheDocument();
        expect(screen.getByText('Quick presets')).toBeInTheDocument();
    });
});
