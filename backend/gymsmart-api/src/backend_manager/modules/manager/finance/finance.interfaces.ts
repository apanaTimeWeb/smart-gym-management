// RESPONSIBILITY: ORM-free domain contract for Manager finance.
// FLOW: TypeORM entity -> FinanceMapper -> FinanceDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface FinanceDomainData { id: string; payload: CoreJsonObject; }
