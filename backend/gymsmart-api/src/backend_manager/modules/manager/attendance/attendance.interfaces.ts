// RESPONSIBILITY: ORM-free domain contract for Manager attendance.
// FLOW: TypeORM entity -> AttendanceMapper -> AttendanceDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface AttendanceDomainData { id: string; payload: CoreJsonObject; }
