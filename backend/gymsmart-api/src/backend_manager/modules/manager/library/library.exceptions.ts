// RESPONSIBILITY: Typed Manager library exceptions exposed to HTTP error translation.
// FLOW: Use-case -> LibraryNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class LibraryNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('library', id); }
}
