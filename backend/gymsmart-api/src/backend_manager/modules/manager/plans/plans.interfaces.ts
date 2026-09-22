// RESPONSIBILITY: ORM-free domain contract for Manager plans.
// FLOW: TypeORM entity -> PlansMapper -> PlansDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface PlansDomainData { id: string; payload: CoreJsonObject; }
