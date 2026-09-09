// RESPONSIBILITY: Centralized constants, mock data, and shared config for the Admin Members module.
import { z } from 'zod';

export const ADMIN_MEMBERS_ITEMS_PER_PAGE = 10;

export const MEMBER_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'expired', label: 'Expired' },
  { value: 'pending', label: 'Pending' },
  { value: 'frozen', label: 'Frozen' },
] as const;

export const EXPIRY_FILTER_OPTIONS = [
  { value: 'all', label: 'All Members' },
  { value: 'this_week', label: 'Expiring This Week' },
  { value: 'this_month', label: 'Expiring This Month' },
] as const;



export const MemberSearchSchema = z.object({
  search: z.string().optional(),
});
