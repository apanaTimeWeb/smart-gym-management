// RESPONSIBILITY: Renders the Profile Main.test component and its associated UI logic.
import { render, screen, fireEvent } from '@testing-library/react';
import SuperadminProfileMain from '@/app/superadmin/profile/profile_components/SuperadminProfileMain/SuperadminProfileMain';
import { useSuperadminProfilePage } from '@/app/superadmin/profile/profile_utils/useSuperadminProfilePage';
import type { Mock } from 'vitest';

vi.mock('@/app/superadmin/profile/profile_utils/useSuperadminProfilePage');
vi.mock('@/app/superadmin/profile/profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard', () => ({ default: () => <div data-testid="avatar-card" /> }));
vi.mock('@/app/superadmin/profile/profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm', () => ({ default: () => <div data-testid="personal-form" /> }));
vi.mock('@/app/superadmin/profile/profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm', () => ({ default: () => <div data-testid="security-form" /> }));

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
    expect(container.querySelector('.motion-safe\\:animate-pulse')).toBeInTheDocument();
  });

  it('renders personal form by default', () => {
    render(<SuperadminProfileMain />);
    expect(screen.getByTestId('avatar-card')).toBeInTheDocument();
    expect(screen.getByTestId('personal-form')).toBeInTheDocument();
    expect(screen.queryByTestId('security-form')).not.toBeInTheDocument();
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
