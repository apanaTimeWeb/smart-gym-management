// RESPONSIBILITY: Owns the backend application module type/interface contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export interface SettingsDomainData { id: string; payload: CoreJsonObject; }

import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';

export interface SettingsListResult { data: SettingsDomainData[]; meta: PaginationMeta; }
