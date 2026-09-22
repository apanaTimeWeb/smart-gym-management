// RESPONSIBILITY: Typed Manager reports exceptions exposed to HTTP error translation.
// FLOW: Use-case -> ReportsNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class ReportsNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('reports', id); }
}
