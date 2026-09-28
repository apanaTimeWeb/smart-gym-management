// RESPONSIBILITY: Marks binary/download HTTP handlers that intentionally bypass JSON envelope wrapping.
// FLOW: Controller metadata → CoreResponseInterceptor → raw response passthrough.

import { SetMetadata } from '@nestjs/common';

export const CORE_RAW_RESPONSE_KEY = 'core_raw_response';
export const CoreRawResponse = () => SetMetadata(CORE_RAW_RESPONSE_KEY, true);
