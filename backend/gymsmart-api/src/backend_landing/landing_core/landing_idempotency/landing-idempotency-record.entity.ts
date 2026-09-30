// RESPONSIBILITY: Maps durable idempotency state used to make critical mutations safe across retries and Redis failures.
// FLOW: LandingIdempotencyService â†’ LandingIdempotencyRepository â†’ tenant PostgreSQL idempotency_records.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';

import type { LandingCommandResult } from '@/backend_landing/landing_core/landing_types/landing-command-result.types';


/**
 * Intent: Defines the LandingIdempotencyRecordEntity class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Entity('idempotency_records')
@Index('UQ_idempotency_records_scope_key', ['scope', 'key'], { unique: true })
@Index('IDX_idempotency_records_created_at', ['createdAt'])
/**
 * Intent: Defines the landing idempotency record entity boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingIdempotencyRecordEntity extends LandingBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_idempotency_records', comment: 'UUID identity for one durable idempotency record.' })
  declare id: string;

  @Column({ length: 120, comment: 'Stable command scope used to prevent the same key from crossing mutation operations.' })
  scope!: string;

  @Column({ length: 255, comment: 'Client idempotency key after normalization.' })
  key!: string;

  @Column({ name: 'request_hash', length: 64, comment: 'SHA-256 fingerprint of the normalized request payload.' })
  requestHash!: string;

  @Column({ type: 'boolean', default: true, comment: 'True while the transaction that owns this key is in progress.' })
  processing!: boolean;

  @Column({ type: 'jsonb', nullable: true, comment: 'Canonical response persisted for safe replay after successful commit.' })
  response!: LandingCommandResult<null> | null;
}
