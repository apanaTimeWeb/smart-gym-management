// RESPONSIBILITY: Defines ORM-neutral durable idempotency state consumed by the application layer.
// FLOW: Repository mapper -> LandingIdempotencyRecord -> idempotency service.

import type { LandingCommandResult } from "@/backend_landing/landing_core/landing_types/landing-command-result.types";

/**
 * Intent: Represent durable idempotency state without exposing TypeORM metadata to application services.
 * Edge Cases: A processing record has no replay response; a completed record contains the immutable command result.
 * Side Effects: None.
 * AI Notes: Keep persistence decorators and ORM imports out of this domain contract.
 */
export interface LandingIdempotencyRecord {
  id: string;
  scope: string;
  key: string;
  requestHash: string;
  processing: boolean;
  response: LandingCommandResult<null> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
