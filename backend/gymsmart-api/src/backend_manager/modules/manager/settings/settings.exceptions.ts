// RESPONSIBILITY: Typed Manager settings exceptions exposed to HTTP error translation.
// FLOW: Use-case -> SettingsNotFoundException -> CoreExceptionFilter -> canonical error envelope.
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';

export class SettingsNotFoundException extends CoreNotFoundException {
  constructor(id: string) { super('settings', id); }
}
