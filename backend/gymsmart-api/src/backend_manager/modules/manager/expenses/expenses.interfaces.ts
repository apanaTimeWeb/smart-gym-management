// RESPONSIBILITY: ORM-free domain contract for Manager expenses.
// FLOW: TypeORM entity -> ExpensesMapper -> ExpensesDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface ExpensesDomainData { id: string; payload: CoreJsonObject; }
