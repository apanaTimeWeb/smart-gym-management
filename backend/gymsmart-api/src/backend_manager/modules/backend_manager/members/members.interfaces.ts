// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export interface MembersDomainData { id: string; payload: CoreJsonObject; }


export interface MembersPlanSnapshot { id?: string; name?: string; duration?: number; price?: number; }
export interface MembersPaymentSnapshot { id?: string; amount?: number; paidAt?: string; method?: string; status?: string; receiptNumber?: string; }
export interface MembersDietPlanSnapshot { id?: string; name?: string; goal?: string; calories?: number; protein?: number; carbs?: number; fats?: number; }
export interface MembersWorkoutSnapshot { id?: string; name?: string; level?: string; duration?: number; }

import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';

export interface MembersListResult { data: MembersDomainData[]; meta: PaginationMeta; }
