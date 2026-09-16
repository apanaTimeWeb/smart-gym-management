// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin branches feature.

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin branches feature.
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Andheri East', location: 'Mumbai', status: 'active', revenue: 185000, expenses: 72000, studentsCount: 420, staffCount: 18 },
  { id: 'b2', name: 'Bandra West', location: 'Mumbai', status: 'active', revenue: 142000, expenses: 61000, studentsCount: 340, staffCount: 15 },
  { id: 'b3', name: 'Powai', location: 'Mumbai', status: 'active', revenue: 98000, expenses: 50000, studentsCount: 220, staffCount: 11 },
  { id: 'b4', name: 'Thane', location: 'Thane', status: 'active', revenue: 60000, expenses: 41000, studentsCount: 180, staffCount: 9 },
];

// --- From AdminAnnouncementsMockData.ts ---
