// RESPONSIBILITY: Defines application-level member inputs and response-supporting types without ORM coupling.
// FLOW: DTO mapper → service input → repository persistence; mapper → API domain.

import type { MemberBillingCycle, MemberProgressStatus, MemberStatus } from '@/backend_trainer/modules/backend_trainer/members/members-enums';

export interface MembersUpdateInput {
  name?: string; phone?: string; email?: string; address?: string | null; planId?: string; planName?: string | null;
  planTier?: string | null; billingCycle?: MemberBillingCycle; status?: MemberStatus; joinDate?: string; expiryDate?: string;
  fitnessLevel?: string | null; targetWeightKg?: number | null; fitnessGoal?: string | null;
  progressStatus?: MemberProgressStatus | null; assignedDietId?: string | null; assignedWorkoutId?: string | null; assignedDietSnapshot?: Record<string, unknown> | null; assignedWorkoutSnapshot?: Record<string, unknown> | null; weightKg?: number | null; heightCm?: number | null; age?: number | null; bmi?: number | null; isPT?: boolean | null; medicalRestrictions?: string | null; daysSinceLastCheckIn?: number | null; membershipNumber?: string | null; assessment?: Record<string, unknown> | null;
}
