// RESPONSIBILITY: Provides the common UUID identity, timestamp, and soft-delete abstraction inherited by database entities.
// FLOW: Entity â†’ LandingBaseEntity identity/timestamps/soft-delete â†’ PostgreSQL row.
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Intent: Defines the landing base entity boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export abstract class LandingBaseEntity {
  abstract id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', precision: 3, comment: 'UTC timestamp when the row was created.' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', precision: 3, comment: 'UTC timestamp when the row was last updated.' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true, precision: 3, comment: 'UTC timestamp when the row was soft-deleted; null while active.' })
  deletedAt!: Date | null;
}
