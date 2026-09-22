// RESPONSIBILITY: Typed Manager members exceptions exposed to HTTP error translation.
// FLOW: Use-case -> MembersNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class MembersNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('members', id); }
}
