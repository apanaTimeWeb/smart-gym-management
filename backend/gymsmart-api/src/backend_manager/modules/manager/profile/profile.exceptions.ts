// RESPONSIBILITY: Typed Manager profile exceptions exposed to HTTP error translation.
// FLOW: Use-case -> ProfileNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class ProfileNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('profile', id); }
}
