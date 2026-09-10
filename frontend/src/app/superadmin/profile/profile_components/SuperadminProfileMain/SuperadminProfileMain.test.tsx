import { render, screen, fireEvent } from '@testing-library/react';
import SuperadminProfileMain from './SuperadminProfileMain';
import { useProfilePage } from '@/app/superadmin/profile/profile_utils/useProfilePage';

jest.mock('@/app/superadmin/profile/profile_utils/useProfilePage');
jest.mock('@/app/superadmin/profile/profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard', () => () => <div data-testid="avatar-card" />);
jest.mock('@/app/superadmin/profile/profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm', () => () => <div data-testid="personal-form" />);
jest.mock('@/app/superadmin/profile/profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm', () => () => <div data-testid="security-form" />);

describe('SuperadminProfileMain', () => {
  const mockUseProfilePage = useProfilePage as jest.Mock;

  beforeEach(() => {
    mockUseProfilePage.mockReturnValue({
      activeTab: 'personal',
      setActiveTab: jest.fn(),
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
      updatePersonalMutation: { mutate: jest.fn() },
      passwordState: 'idle',
      updatePasswordMutation: { mutate: jest.fn() },
      twoFAState: 'idle',
      toggle2FAMutation: { mutate: jest.fn() },
    });
  });

  it('renders loading state when profile is loading', () => {
    mockUseProfilePage.mockReturnValue({ profileLoading: true });
    const { container } = render(<SuperadminProfileMain />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders personal form by default', () => {
    render(<SuperadminProfileMain />);
    expect(screen.getByTestId('avatar-card')).toBeInTheDocument();
    expect(screen.getByTestId('personal-form')).toBeInTheDocument();
    expect(screen.queryByTestId('security-form')).not.toBeInTheDocument();
  });

  it('switches to security form when security tab is clicked', () => {
    const setActiveTab = jest.fn();
    mockUseProfilePage.mockReturnValue({
      ...mockUseProfilePage(),
      setActiveTab,
    });
    render(<SuperadminProfileMain />);
    fireEvent.click(screen.getByText('Security'));
    expect(setActiveTab).toHaveBeenCalledWith('security');
  });
});
