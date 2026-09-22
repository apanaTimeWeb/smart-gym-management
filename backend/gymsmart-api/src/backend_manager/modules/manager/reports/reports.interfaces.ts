// RESPONSIBILITY: ORM-free domain contract for Manager reports.
// FLOW: TypeORM entity -> ReportsMapper -> ReportsDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface ReportsDomainData { id: string; payload: CoreJsonObject; }
