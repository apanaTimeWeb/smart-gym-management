// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerCommunicationsDomainData { id: string; payload: ManagerCoreJsonObject; }

import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerCommunicationsListResult { data: ManagerCommunicationsDomainData[]; meta: PaginationMeta; }
