// RESPONSIBILITY: Marks a mutation as requiring an Idempotency-Key header at the global interceptor boundary.
// FLOW: Route metadata → CoreIdempotencyInterceptor → Redis idempotency record.

import { SetMetadata } from '@nestjs/common'; export const CORE_IDEMPOTENCY_REQUIRED='core_idempotency_required'; export const CoreIdempotency=()=>SetMetadata(CORE_IDEMPOTENCY_REQUIRED,true);
