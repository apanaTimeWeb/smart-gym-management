// RESPONSIBILITY: Typed Manager communications exceptions exposed to HTTP error translation.
// FLOW: Use-case -> CommunicationsNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class CommunicationsNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('communications', id); }
}
