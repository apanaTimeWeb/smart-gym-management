// RESPONSIBILITY: ORM-free domain contract for Manager workout.
// FLOW: TypeORM entity -> WorkoutMapper -> WorkoutDomainData -> use case/controller.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
export interface WorkoutDomainData { id: string; payload: CoreJsonObject; }
