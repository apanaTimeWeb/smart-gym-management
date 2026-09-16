// RESPONSIBILITY: Constants, mock data, and Zod schema for the Blacklist module.
import { z } from 'zod';
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

export const BlacklistSchema = z.object({
  memberId: z.string().min(1, 'Member ID required'),
  memberName: z.string().min(2, 'Name required'),
  memberPhone: z.string().min(10, 'Valid phone required'),
  memberEmail: z.string().email('Valid email required'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  scope: z.enum(['global', 'specific']),
  assignedGyms: z.array(z.string()).min(1, 'Select at least one gym'),
});

export const EMPTY_BLACKLIST_FORM = {
  memberId: '',
  memberName: '',
  memberPhone: '',
  memberEmail: '',
  reason: '',
  scope: 'global' as const,
  assignedGyms: ['all'],
};



export { MOCK_BLACKLIST, MOCK_BLACKLIST_KPI } from '@/app/admin/blacklist/blacklist_mocks/fixtures/AdminBlacklistMockFixtures';
