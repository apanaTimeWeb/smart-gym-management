// RESPONSIBILITY: Typed Manager dashboard exceptions exposed to HTTP error translation.
// FLOW: Use-case -> DashboardNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class DashboardNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('dashboard', id); }
}
