// RESPONSIBILITY: Typed Manager schedule exceptions exposed to HTTP error translation.
// FLOW: Use-case -> ScheduleNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class ScheduleNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('schedule', id); }
}
