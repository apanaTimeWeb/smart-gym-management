// RESPONSIBILITY: Owns backend core NestJS metadata/decorator contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { SetMetadata } from '@nestjs/common';

export const CORE_REQUIRE_IDEMPOTENCY_KEY = 'core_require_idempotency_key';
export const CoreRequireIdempotencyKey = () => SetMetadata(CORE_REQUIRE_IDEMPOTENCY_KEY, true);
