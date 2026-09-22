// RESPONSIBILITY: Marks binary transport endpoints that cannot use the JSON response envelope.
// FLOW: Controller metadata -> CoreResponseInterceptor -> pass-through binary response.
import { SetMetadata } from '@nestjs/common';

export const CoreRawResponse = () => SetMetadata('core_raw_response', true);
