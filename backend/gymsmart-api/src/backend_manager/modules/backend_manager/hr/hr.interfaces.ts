// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

export interface HrDomainData { id:string; payload:CoreJsonObject; }
export interface HrPayrollDeductions { [key:string]: CoreJsonValue; }

import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';

export interface HrListResult { data: HrDomainData[]; meta: PaginationMeta; }
