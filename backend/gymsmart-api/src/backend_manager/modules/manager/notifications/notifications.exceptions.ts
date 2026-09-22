// RESPONSIBILITY: Typed Manager notifications exceptions exposed to HTTP error translation.
// FLOW: Use-case -> NotificationsNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class NotificationsNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('notifications', id); }
}
