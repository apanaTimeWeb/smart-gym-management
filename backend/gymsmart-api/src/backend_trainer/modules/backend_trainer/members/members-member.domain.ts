// RESPONSIBILITY: Defines the members business object independently from TypeORM persistence.
// FLOW: MembersRepository entity → MembersMemberMapper → domain response → Members service.

export interface MembersMemberDomain {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string | null;
  branch: string;
  planId: string;
  plan: { id: string; name: string; tier: string } | null;
  billingCycle: string;
  status: string;
  joinDate: string;
  expiryDate: string;
  photo: string | null;
  createdAt: string;
  age: number | null;
  heightCm: number | null;
  weightKg: number | null;
  lastWorkout: string | null;
  progressStatus: string | null;
  assignedTrainerId: string | null;
  assignedTrainerName: string | null;
  isPT: boolean | null;
  assignedDietId: string | null;
  assignedWorkoutId: string | null;
  assignedDiet?: Record<string, unknown> | null;
  assignedWorkout?: Record<string, unknown> | null;
  fitnessLevel: string | null;
  targetWeightKg: number | null;
  bmi: number | null;
  medicalRestrictions: string | null;
  fitnessGoal: string | null;
  daysSinceLastCheckIn: number | null;
  membershipNumber: string | null;
  assessment: Record<string, unknown> | null;
}
