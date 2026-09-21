// RESPONSIBILITY: Provides the canonical persistence identity and lifecycle fields shared by every TypeORM entity.
// FLOW: Feature entity -> BaseEntity -> PostgreSQL primary key + lifecycle columns.
import { Column, PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
  /** Stable application identifier; deterministic seed data may preserve frontend fixture IDs. */
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 64, default: () => "substring(md5(random()::text || clock_timestamp()::text), 1, 32)" })
  id!: string;

  /** Creation timestamp stored in UTC. */
  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  /** Update timestamp stored in UTC. */
  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  /** Soft-delete timestamp; null means the record is active. */
  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;
}
