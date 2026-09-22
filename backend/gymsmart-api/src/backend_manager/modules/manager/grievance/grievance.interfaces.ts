// RESPONSIBILITY: ORM-free domain contract for Manager grievance.
// FLOW: TypeORM entity -> GrievanceMapper -> GrievanceDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface GrievanceDomainData { id: string; payload: CoreJsonObject; }
