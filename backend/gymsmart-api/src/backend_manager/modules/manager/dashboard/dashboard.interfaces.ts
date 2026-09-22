// RESPONSIBILITY: ORM-free domain contract for Manager dashboard.
// FLOW: TypeORM entity -> DashboardMapper -> DashboardDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface DashboardDomainData { id: string; payload: CoreJsonObject; }
