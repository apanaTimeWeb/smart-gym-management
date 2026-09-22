// RESPONSIBILITY: Typed Manager attendance exceptions exposed to HTTP error translation.
// FLOW: Use-case -> AttendanceNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';

export class AttendanceNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('attendance', id); }
}
