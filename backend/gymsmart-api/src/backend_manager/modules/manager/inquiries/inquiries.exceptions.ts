// RESPONSIBILITY: Typed Manager inquiries exceptions exposed to HTTP error translation.
// FLOW: Use-case -> InquiriesNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class InquiriesNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('inquiries', id); }
}
