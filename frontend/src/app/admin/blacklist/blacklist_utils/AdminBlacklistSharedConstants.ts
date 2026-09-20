// RESPONSIBILITY: Constants, mock data, and Zod schema for the Blacklist module.
import type { BlacklistedMember, BlacklistKPIData } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';

export type BlacklistActiveTab = 'all' | 'cross-branch';

export const BLACKLIST_TAB_OPTIONS: { value: BlacklistActiveTab; label: string }[] = [
  { value: 'all', label: 'All Entries' },
  { value: 'cross-branch', label: 'Cross-Branch View' },
];

export const BLACKLIST_GYM_OPTIONS = [
  { value: 'all', label: 'All Gyms' },
  { value: 'g1', label: 'Andheri East' },
  { value: 'g2', label: 'Bandra West' },
  { value: 'g3', label: 'Powai' },
  { value: 'g4', label: 'Thane' },
];

export const BLACKLIST_SCOPE_OPTIONS = [
  { value: 'all', label: 'All Scopes' },
  { value: 'global', label: 'Global Ban' },
  { value: 'specific', label: 'Gym-Specific' },
];

export const BLACKLIST_ITEMS_PER_PAGE = 10;



export const EMPTY_BLACKLIST_FORM = {
  memberId: '',
  memberName: '',
  memberPhone: '',
  memberEmail: '',
  reason: '',
  scope: 'global' as const,
  assignedGyms: ['all'],
};
