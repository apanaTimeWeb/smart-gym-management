import type { ManagerProfileData } from '@/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes';

/**
 * @description Provides the ManagerProfileMockData implementation for the profile module.
 * @dependencies @/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PROFILE: ManagerProfileData = {
  id: 'm-001',
  name: 'Vikram Singh',
  email: 'vikram.manager@gym.com',
  phone: '+919876543210',
  role: 'Branch Manager',
  branchName: 'Koregaon Park Branch',
  joinedAt: '2023-01-15T10:00:00Z',
  avatarInitial: 'V' };
