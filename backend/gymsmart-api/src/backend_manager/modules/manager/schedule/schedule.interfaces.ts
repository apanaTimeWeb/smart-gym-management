// RESPONSIBILITY: ORM-free domain contract for Manager schedule.
// FLOW: TypeORM entity -> ScheduleMapper -> ScheduleDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface ScheduleDomainData { id: string; payload: CoreJsonObject; }
