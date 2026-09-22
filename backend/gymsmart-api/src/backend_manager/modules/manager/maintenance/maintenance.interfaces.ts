// RESPONSIBILITY: ORM-free domain contract for Manager maintenance.
// FLOW: TypeORM entity -> MaintenanceMapper -> MaintenanceDomainData -> use case/controller.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
export interface MaintenanceDomainData { id: string; payload: CoreJsonObject; }
