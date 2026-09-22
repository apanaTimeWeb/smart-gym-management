// RESPONSIBILITY: ORM-free domain contract for Manager hr.
// FLOW: TypeORM entity -> HrMapper -> HrDomainData -> use case/controller.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
export interface HrDomainData { id: string; payload: CoreJsonObject; }
