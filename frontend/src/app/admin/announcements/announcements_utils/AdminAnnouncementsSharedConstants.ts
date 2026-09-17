// RESPONSIBILITY: Constants, mock data, Zod schema for the Admin Announcements module.
import { z } from 'zod';
import type { Announcement, AnnouncementKPIData } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';

export const ANNOUNCEMENTS_ITEMS_PER_PAGE = 10;

// Used in the filter toolbar — lets admin filter the list across their branches.
export const ANNOUNCEMENT_GYM_OPTIONS = [
  { value: 'all', label: 'All My Branches' },
  { value: 'g1', label: 'Andheri East' },
  { value: 'g2', label: 'Bandra West' },
  { value: 'g3', label: 'Powai' },
  { value: 'g4', label: 'Thane' },
];

// Used in the compose modal — admin can only target their own branches.
// "All Gyms" is superadmin-only and must never appear here.
export const ANNOUNCEMENT_COMPOSE_GYM_OPTIONS = [
  { value: 'g1', label: 'Andheri East' },
  { value: 'g2', label: 'Bandra West' },
  { value: 'g3', label: 'Powai' },
  { value: 'g4', label: 'Thane' },
];

// Admin audience: no cross-gym "Managers" — admins broadcast to their own gym's people only.
export const ANNOUNCEMENT_AUDIENCE_OPTIONS = [
  { value: 'all' as const,      label: 'Everyone at Branch' },
  { value: 'members' as const,  label: 'Members' },
  { value: 'trainers' as const, label: 'Trainers' },
  { value: 'staff' as const,    label: 'Staff' },
];

export const ANNOUNCEMENT_PRIORITY_OPTIONS = [
  { value: 'high',   label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low',    label: 'Low' },
];

export const ANNOUNCEMENT_STATUS_OPTIONS = [
  { value: 'all',       label: 'All Status' },
  { value: 'active',    label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'expired',   label: 'Expired' },
  { value: 'draft',     label: 'Draft' },
];

export const AnnouncementSchema = z.object({
  title:       z.string().min(5, 'Title must be at least 5 characters'),
  body:        z.string().min(20, 'Body must be at least 20 characters'),
  priority:    z.enum(['high', 'medium', 'low']),
  audience:    z.array(z.enum(['all', 'members', 'managers', 'trainers', 'staff'])).min(1, 'Select at least one audience'),
  gymIds:      z.array(z.string()).min(1, 'Select at least one branch'),
  publishedAt: z.string().min(1, 'Publish date required'),
  expiresAt:   z.string().min(1, 'Expiry date required'),
  isPinned:    z.boolean(),
});

// Default form state — gymIds defaults to first branch (not 'all', which is superadmin-only).
export const EMPTY_ANNOUNCEMENT_FORM = {
  title:       '',
  body:        '',
  priority:    'medium' as const,
  audience:    ['all'] as ('all' | 'members' | 'managers' | 'trainers' | 'staff')[],
  gymIds:      ['g1'],
  publishedAt: new Date().toISOString().slice(0, 16),
  expiresAt:   new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  isPinned:    false,
};

