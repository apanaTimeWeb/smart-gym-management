export interface PlanSnapshot {
  id: string;
  name: string;
  price1Month: number;
  price3Month: number;
  price6Month: number;
  price12Month: number;
  priceCustom?: number;
}

export interface PaymentSnapshot {
  id: string;
  amount: number;
  paidAt: string;
  method: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  invoiceNumber: string;
}

export interface DietPlanSnapshot {
  id: string;
  name: string;
  description: string;
  type: 'WEIGHT_LOSS' | 'MUSCLE_GAIN' | 'MAINTENANCE' | 'KETO' | 'VEGAN' | 'OTHER';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: {
    name: string;
    time: string;
    calories: number;
    foods: string[];
  }[];
}

export interface WorkoutSnapshot {
  id: string;
  name: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  daysPerWeek: number;
  goal: string;
  days: {
    day: number | string;
    focus: string;
    exercises: {
      name: string;
      sets: number;
      reps: number;
      notes?: string;
    }[];
  }[];
}

export interface AttendanceSnapshot {
  id: string;
  date: string;
  checkIn: string;
  type: 'MEMBER' | 'STAFF';
}
