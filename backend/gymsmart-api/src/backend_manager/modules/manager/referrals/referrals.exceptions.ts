// RESPONSIBILITY: Typed Manager referrals exceptions exposed to HTTP error translation.
// FLOW: Use-case -> ReferralsNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class ReferralsNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('referrals', id); }
}
