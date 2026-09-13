import type { Member, MemberStats } from '../members_types/members_types';

export const MOCK_MEMBER_STATS: MemberStats = {
  total: 145,
  active: 120,
  pending: 10,
  expired: 15
};

export const MOCK_MEMBERS: Member[] = [
  {
    id: "MEM-001",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "9876543210",
    gender: "MALE",
    branch: "BR-01",
    planId: "PL-01",
    plan: { id: "PL-01", name: "Annual Pro", tier: "Gold" },
    billingCycle: "Yearly",
    status: "ACTIVE",
    joinDate: "2023-01-15T00:00:00Z",
    expiryDate: "2024-01-15T00:00:00Z",
    createdAt: "2023-01-15T00:00:00Z",
    age: 28,
    progressStatus: "Good",
    fitnessGoal: "Weight Loss",
    daysSinceLastCheckIn: 2,
    membershipNumber: "M-2023-001"
  },
  {
    id: "MEM-002",
    name: "Priya Patel",
    email: "priya.p@example.com",
    phone: "9876543211",
    gender: "FEMALE",
    branch: "BR-01",
    planId: "PL-02",
    plan: { id: "PL-02", name: "Monthly Starter", tier: "Silver" },
    billingCycle: "Monthly",
    status: "ACTIVE",
    joinDate: "2023-08-01T00:00:00Z",
    expiryDate: "2023-09-01T00:00:00Z",
    createdAt: "2023-08-01T00:00:00Z",
    age: 24,
    progressStatus: "Needs Attention",
    fitnessGoal: "Muscle Gain",
    daysSinceLastCheckIn: 5,
    membershipNumber: "M-2023-002"
  }
];
