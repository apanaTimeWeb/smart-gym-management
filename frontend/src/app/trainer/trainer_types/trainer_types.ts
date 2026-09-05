// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Shared TypeScript types for the Trainer module.
// Extracted to strictly enforce Module Boundary Isolation (Rule 63).

export interface Member {
  id: string; name: string; email: string; phone: string;
  gender: string; address?: string; branch: string;
  planId: string; plan?: { id: string; name: string; tier: string };
  billingCycle: string; status: string;
  joinDate: string; expiryDate: string;
  paidAmount: number; pendingAmount: number; photo?: string;
  createdAt: string;
}

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
  member?: { name: string };
  staff?: { name: string };
}

export interface Exercise {
  id: string; name: string; category: string; muscleGroup: string[];
  sets?: number; reps?: string; duration?: string;
  difficulty: string; description?: string; videoUrl?: string; imageUrl?: string; isActive: boolean;
}

export interface DietPlan {
  id: string; name: string; goal: string;
  calories?: number; protein?: number; carbs?: number; fats?: number;
  description?: string; meals: string[]; isActive: boolean;
}

export interface Workout {
  id: string; name: string; level: string; days: number;
  exercises: number; focus: string; duration: string; tags: string[]; isActive?: boolean;
}

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

