// RESPONSIBILITY: Typed Manager grievance exceptions exposed to HTTP error translation.
// FLOW: Use-case -> GrievanceNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class GrievanceNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('grievance', id); }
}
