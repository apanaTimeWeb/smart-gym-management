// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin members feature.
import type { AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin members feature.

export const MOCK_ADMIN_MEMBERS_SUMMARY: AdminMembersSummary = {
  totalMembers: 12500,
  activeMembers: 10200,
  expiredMembers: 1500,
  pendingMembers: 800,
  expiringThisWeek: 350,
  expiringThisMonth: 1200,
  totalOutstanding: 450000,
  newThisMonth: 450,
};

import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

export const MOCK_ADMIN_MEMBERS = [
  {
    id: 'm1',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '9876543210',
    branchId: 'b1',
    branchName: 'Downtown Main',
    planName: 'Annual Pro',
    status: 'active',
    joinDate: '2026-01-15T10:00:00Z',
    expiryDate: '2026-01-15T10:00:00Z',
    pendingAmount: 0,
    gender: 'Male',
    totalVisits: 145,
  },
  {
    id: 'm2',
    name: 'Priya Singh',
    email: 'priya.s@example.com',
    phone: '9876543211',
    branchId: 'b2',
    branchName: 'Westside Gym',
    planName: 'Quarterly Classic',
    status: 'active',
    joinDate: '2026-05-20T10:00:00Z',
    expiryDate: '2026-08-20T10:00:00Z',
    pendingAmount: 1500,
    gender: 'Female',
    totalVisits: 45,
  },
  {
    id: 'm3',
    name: 'Amit Kumar',
    email: 'amit.k@example.com',
    phone: '9876543212',
    branchId: 'b1',
    branchName: 'Downtown Main',
    planName: 'Monthly Basic',
    status: 'expired',
    joinDate: '2026-06-10T10:00:00Z',
    expiryDate: '2026-07-10T10:00:00Z',
    pendingAmount: 0,
    gender: 'Male',
    totalVisits: 12,
  }
] as AdminMember[];


// --- From AdminPlansMockData.ts ---

export const MOCK_ADMIN_MEMBERS_EXPANDED = [
  ...MOCK_ADMIN_MEMBERS,
  ...Array.from({ length: 21 }, (_, index) => {
    const base = MOCK_ADMIN_MEMBERS[index % MOCK_ADMIN_MEMBERS.length]!;
    const n = index + 4;
    return {
      ...base,
      id: `m${n}`,
      name: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair', 'Riya Desai', 'Kabir Singh'][index % 6] + ` ${n}`,
      email: `member${n}@example.com`,
      phone: `987654${(3210 + n).toString().slice(-4)}`,
      branchId: ['b1', 'b2', 'b3', 'b4'][index % 4]!,
      branchName: ['Downtown Main', 'Westside Gym', 'Northside Arena', 'Eastside Fitness'][index % 4]!,
      planName: ['Annual Pro', 'Quarterly Classic', 'Monthly Basic'][index % 3]!,
      status: ['active', 'active', 'pending', 'expired'][index % 4] as AdminMember['status'],
      joinDate: `2026-0${(index % 9) + 1}-${String((index % 24) + 1).padStart(2, '0')}T10:00:00Z`,
      expiryDate: `2026-${String((index % 9) + 4).padStart(2, '0')}-${String((index % 24) + 1).padStart(2, '0')}T10:00:00Z`,
      pendingAmount: index % 4 === 0 ? 0 : 500 * ((index % 6) + 1),
      gender: ['Male', 'Female', 'Other'][index % 3]!,
      totalVisits: 10 + index * 7,
    };
  }),
] as AdminMember[];
