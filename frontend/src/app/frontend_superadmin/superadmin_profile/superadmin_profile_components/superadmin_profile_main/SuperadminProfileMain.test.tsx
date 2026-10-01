// RESPONSIBILITY: Renders the Profile Main.test component and its associated UI logic.
import { render, screen, fireEvent } from '@testing-library/react';

import SuperadminProfileMain from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_main/SuperadminProfileMain';
import { resetSuperadminProfileMockState } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_handlers/SuperadminProfileMockHandlers';
import { useSuperadminProfilePage } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfilePage';

import type { Mock } from 'vitest';

vi.mock('@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfilePage');
vi.mock('@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_avatar_card/SuperadminProfileAvatarCard', () => ({ default: () => <div data-testid="superadmin_profile-profile-profile-main-control"/> }));
vi.mock('@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_personal_form/SuperadminProfilePersonalForm', () => ({ default: () => <div data-testid="superadmin_profile-profile-profile-main-control-2"/> }));
vi.mock('@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_security_form/SuperadminProfileSecurityForm', () => ({ default: () => <div data-testid="superadmin_profile-profile-profile-main-control-3"/> }));
beforeEach(() => {
  resetSuperadminProfileMockState();
});

describe('SuperadminProfileMain', () => {
    const mockUseProfilePage = useSuperadminProfilePage as Mock;
    beforeEach(() => {
        mockUseProfilePage.mockReturnValue({
            activeTab: 'personal',
            setActiveTab: vi.fn(),
            profile: {
                id: '1',
                name: 'Admin',
                email: 'admin@test.com',
                phone: '1234567890',
                role: 'SUPERADMIN',
                twoFactorEnabled: false,
                lastLoginAt: '2024-01-01T00:00:00Z',
                createdAt: '2024-01-01T00:00:00Z',
            },
            profileLoading: false,
            personalState: 'idle',
            updatePersonalMutation: { mutate: vi.fn() },
            passwordState: 'idle',
            updatePasswordMutation: { mutate: vi.fn() },
            twoFAState: 'idle',
            toggle2FAMutation: { mutate: vi.fn() },
        });
    });
    it('renders loading state when profile is loading', () => {
        mockUseProfilePage.mockReturnValue({ profileLoading: true });
        const { container } = render(<SuperadminProfileMain />);
        expect(container.querySelector('.motion-safe\\:motion-safe:animate-pulse')).toBeInTheDocument();
    });
    it('renders personal form by default', () => {
        render(<SuperadminProfileMain />);
        expect(screen.getByTestId('profile-profile-main-control')).toBeInTheDocument();
        expect(screen.getByTestId('profile-profile-main-control-2')).toBeInTheDocument();
        expect(screen.queryByTestId('profile-profile-main-control-3')).not.toBeInTheDocument();
    });
    it('switches to security form when security tab is clicked', () => {
        const setActiveTab = vi.fn();
        mockUseProfilePage.mockReturnValue({
            ...mockUseProfilePage(),
            setActiveTab,
        });
        render(<SuperadminProfileMain />);
        fireEvent.click(screen.getByText('Security'));
        expect(setActiveTab).toHaveBeenCalledWith('security');
    });
});
