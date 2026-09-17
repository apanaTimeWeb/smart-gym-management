import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SuperadminGymDetailV1Client from '@/app/superadmin/gyms/gyms_components/SuperadminGymDetailV1Client';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailV1MockFixtures';
import { useSuperadminGymDetailV1 } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetailV1';
vi.mock('@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetailV1', () => ({
    useSuperadminGymDetailV1: vi.fn(),
}));
const mockedUseDetail = vi.mocked(useSuperadminGymDetailV1);
describe('Superadmin Gym 360', () => {
    beforeEach(() => {
        mockedUseDetail.mockReset();
    });
    it('requests the selected gym and renders that gym data', () => {
        mockedUseDetail.mockReturnValue({
            data: {
                success: true,
                message: 'Gym loaded.',
                data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t2,
            },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        } as ReturnType<typeof useSuperadminGymDetailV1>);
        render(<SuperadminGymDetailV1Client gymId="t2"/>);
        expect(mockedUseDetail).toHaveBeenCalledWith('t2');
        expect(screen.getByText('Fit Life Studio')).toBeInTheDocument();
    });
    it('switches visible detail sections through accessible tabs', () => {
        mockedUseDetail.mockReturnValue({
            data: {
                success: true,
                message: 'Gym loaded.',
                data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t1,
            },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        } as ReturnType<typeof useSuperadminGymDetailV1>);
        render(<SuperadminGymDetailV1Client gymId="t1"/>);
        fireEvent.click(screen.getByRole('tab', { name: 'Billing' }));
        expect(screen.getByText('Failed payments')).toBeInTheDocument();
    });
});
