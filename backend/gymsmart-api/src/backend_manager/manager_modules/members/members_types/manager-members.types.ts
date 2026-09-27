// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface MembersDomainData { id: string; payload: ManagerCoreJsonObject; }


export interface MembersPlanSnapshot { id?: string; name?: string; duration?: number; price?: number; }
export interface MembersPaymentSnapshot extends ManagerCoreJsonObject { id?: string; amount?: number; currency?: string; paidAt?: string; method?: string; status?: string; invoiceNumber?: string; receiptNumber?: string; }
export interface MembersDietPlanSnapshot { id?: string; name?: string; goal?: string; calories?: number; protein?: number; carbs?: number; fats?: number; }
export interface MembersWorkoutSnapshot { id?: string; name?: string; level?: string; duration?: number; }

import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface MembersListResult { data: MembersDomainData[]; meta: PaginationMeta; }
