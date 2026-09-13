// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Shared TypeScript types for the Trainer module.
// Extracted to strictly enforce Module Boundary Isolation (Rule 63).
import type { Workout, Exercise, WorkoutExercise } from '@/app/trainer/workout/workout_types/workout.schema';
export type { Workout, Exercise, WorkoutExercise };

export interface Member {
  id: string; name: string; email: string; phone: string;
  gender: string; address?: string; branch: string;
  planId: string; plan?: { id: string; name: string; tier: string };
  billingCycle: string; status: string;
  joinDate: string; expiryDate: string;
  photo?: string;
  createdAt: string;
  age?: number;
  lastWorkout?: string;
  progressStatus?: 'Good' | 'Average' | 'Needs Attention';
  assignedTrainerId?: string;
  assignedTrainerName?: string;
  isPT?: boolean;
  assignedDietId?: string;
  assignedDiet?: DietPlan;
  assignedWorkoutId?: string;
  assignedWorkout?: Workout;
  fitnessGoal?: string;
  daysSinceLastCheckIn?: number;
  trainerNotes?: { id: number; text: string; date: string }[];
  emergencyContact?: string;
  bloodGroup?: string;
  medicalHistory?: string[];
  membershipNumber?: string;
}

export type AssignedMemberView = Omit<Member, 'billingCycle'>;

export interface MemberStats {
  total: number; active: number; pending: number; expired: number;
}

export interface Attendance {
  id: string;
  memberId?: number;
  staffId?: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  type: string;
  member?: { name: string; id?: string };
  staff?: { name: string; id?: string };
  durationMinutes?: number;
  checkInMethod?: 'QR' | 'Biometric' | 'Manual';
  lateMinutes?: number;
}

export interface DietPlan {
  id: string; name: string; goal: string;
  calories?: number; protein?: number; carbs?: number; fats?: number;
  description?: string; meals: string[]; isActive: boolean;
}



export type FetchState = 'idle' | 'loading' | 'success' | 'error';

