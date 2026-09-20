import type { Member, MemberStats } from '@/app/trainer/members/members_types/TrainerMembers_types';

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
    heightCm: 175,
    weightKg: 70,
    progressStatus: "Good",
    fitnessGoal: "Weight Loss",
    fitnessLevel: "Intermediate",
    targetWeightKg: 65,
    bmi: 22.9,
    medicalRestrictions: "None reported",
    daysSinceLastCheckIn: 2,
    membershipNumber: "M-2023-001",
    workoutHistory: [
      { id: "WH-001", name: "Full Body Fundamentals", date: "2023-08-01 - 2023-09-01", level: "Beginner", status: "Completed" },
      { id: "WH-002", name: "Conditioning Basics", date: "2023-07-01 - 2023-08-01", level: "Beginner", status: "Completed" }
    ]
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
    assignedDiet: {
      id: '2',
      name: 'Lean Muscle Gain (Male)',
      goal: 'Muscle Gain',
      calories: 2800,
      protein: 180,
      carbs: 350,
      fats: 70,
      description: 'High-protein diet to support lean muscle mass building.',
      meals: [
        { name: 'Breakfast', time: '07:30 AM', items: '5 whole eggs, 1 cup oats, 1 banana' },
        { name: 'Lunch', time: '01:00 PM', items: '200g chicken breast, 1.5 cup brown rice, veggies' },
      ],
      complianceScore: 88,
    },
    heightCm: 162,
    weightKg: 58,
    progressStatus: "Needs Attention",
    fitnessGoal: "Muscle Gain",
    fitnessLevel: "Beginner",
    targetWeightKg: 62,
    bmi: 22.1,
    medicalRestrictions: "None reported",
    daysSinceLastCheckIn: 5,
    membershipNumber: "M-2023-002",
    workoutHistory: [
      { id: "WH-003", name: "Strength Foundation", date: "2023-09-01 - 2023-10-01", level: "Beginner", status: "Completed" }
    ]
  }
];
