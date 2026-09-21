// RESPONSIBILITY: Marks infrastructure endpoints whose native body format must remain unwrapped.
// FLOW: Controller metadata â†’ ResponseInterceptor â†’ native response format.
import { SetMetadata } from '@nestjs/common';

export const SKIP_RESPONSE_ENVELOPE = 'skip-response-envelope';
export const SkipResponseEnvelope = () => SetMetadata(SKIP_RESPONSE_ENVELOPE, true);
