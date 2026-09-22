// RESPONSIBILITY: Typed Manager schedule exceptions exposed to HTTP error translation.
// FLOW: Use-case -> ScheduleNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class ScheduleNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('schedule', id); }
}
