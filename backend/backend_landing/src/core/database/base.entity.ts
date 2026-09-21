// RESPONSIBILITY: Provides the common timestamp and soft-delete abstraction inherited by every database entity.
// FLOW: Entity → CoreBaseEntity timestamps/soft-delete fields → PostgreSQL row.
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CoreBaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', precision: 3 })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', precision: 3 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true, precision: 3 })
  deletedAt!: Date | null;
}
