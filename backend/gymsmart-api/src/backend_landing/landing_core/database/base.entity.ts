// RESPONSIBILITY: Provides the common UUID identity, timestamp, and soft-delete abstraction inherited by database entities.
// FLOW: Entity â†’ CoreBaseEntity identity/timestamps/soft-delete â†’ PostgreSQL row.
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CoreBaseEntity {
  abstract id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', precision: 3 })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', precision: 3 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true, precision: 3 })
  deletedAt!: Date | null;
}
