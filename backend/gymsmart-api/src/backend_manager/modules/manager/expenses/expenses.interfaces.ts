// RESPONSIBILITY: ORM-free domain contract for Manager expenses.
// FLOW: TypeORM entity -> ExpensesMapper -> ExpensesDomainData -> use case/controller.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
export interface ExpensesDomainData { id: string; payload: CoreJsonObject; }
