// RESPONSIBILITY: Defines the Trainer member response domain independently from ORM persistence.
// FLOW: TrainerMembersRepository entity → MembersMemberMapper → frontend-compatible member response.

export interface MembersMemberDomain {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address?: string;
  branch: string;
  planId: string;
  plan?: { id: string; name: string; tier: string };
  billingCycle: string;
  status: string;
  joinDate: string;
  expiryDate: string;
  photo?: string;
  createdAt: string;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  lastWorkout?: string;
  progressStatus?: string;
  assignedTrainerId?: string;
  assignedTrainerName?: string;
  isPT?: boolean;
  assignedDietId?: string;
  assignedWorkoutId?: string;
  assignedDiet?: Record<string, unknown>;
  assignedWorkout?: Record<string, unknown>;
  fitnessLevel?: string;
  targetWeightKg?: number;
  bmi?: number;
  medicalRestrictions?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  medicalHistory?: string[];
  fitnessGoal?: string;
  daysSinceLastCheckIn?: number;
  membershipNumber?: string;
  assessment?: Record<string, unknown>;
  workoutHistory: Array<{ id: string; name: string; date: string; level: string; status: string }>;
}
