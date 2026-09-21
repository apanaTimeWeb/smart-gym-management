// RESPONSIBILITY: Provides mandatory UTC timestamps and soft-delete state to every ORM entity.
// FLOW: Feature entity -> CoreBaseEntity -> TypeORM metadata -> PostgreSQL.

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CoreBaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;
}
