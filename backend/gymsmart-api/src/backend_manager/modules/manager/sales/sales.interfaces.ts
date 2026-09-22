// RESPONSIBILITY: ORM-free domain contract for Manager sales.
// FLOW: TypeORM entity -> SalesMapper -> SalesDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface SalesDomainData { id: string; payload: CoreJsonObject; }
