// RESPONSIBILITY: Typed Manager workout exceptions exposed to HTTP error translation.
// FLOW: Use-case -> WorkoutNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class WorkoutNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('workout', id); }
}
