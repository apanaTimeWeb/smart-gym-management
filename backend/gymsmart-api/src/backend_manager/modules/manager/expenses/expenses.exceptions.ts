// RESPONSIBILITY: Typed Manager expenses exceptions exposed to HTTP error translation.
// FLOW: Use-case -> ExpensesNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class ExpensesNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('expenses', id); }
}
