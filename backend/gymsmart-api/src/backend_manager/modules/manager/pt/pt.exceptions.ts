// RESPONSIBILITY: Typed Manager pt exceptions exposed to HTTP error translation.
// FLOW: Use-case -> PtNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class PtNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('pt', id); }
}
