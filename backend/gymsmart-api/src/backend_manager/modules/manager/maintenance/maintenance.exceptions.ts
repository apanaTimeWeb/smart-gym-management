// RESPONSIBILITY: Typed Manager maintenance exceptions exposed to HTTP error translation.
// FLOW: Use-case -> MaintenanceNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class MaintenanceNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('maintenance', id); }
}
