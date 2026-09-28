// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerMembersDomainData { id: string; payload: ManagerCoreJsonObject; }


export interface ManagerMembersPlanSnapshot { id?: string; name?: string; duration?: number; price?: number; }
export interface ManagerMembersPaymentSnapshot extends ManagerCoreJsonObject { id?: string; amount?: number; currency?: string; paidAt?: string; method?: string; status?: string; invoiceNumber?: string; receiptNumber?: string; }
export interface ManagerMembersDietPlanSnapshot { id?: string; name?: string; goal?: string; calories?: number; protein?: number; carbs?: number; fats?: number; }
export interface ManagerMembersWorkoutSnapshot { id?: string; name?: string; level?: string; duration?: number; }

import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerMembersListResult { data: ManagerMembersDomainData[]; meta: PaginationMeta; }

