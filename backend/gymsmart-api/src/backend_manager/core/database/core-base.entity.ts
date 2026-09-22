// RESPONSIBILITY: Canonical TypeORM base abstraction for UUID identity, UTC timestamps, and soft deletion.
// FLOW: Feature entity -> CoreBaseEntity -> tenant PostgreSQL table.
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;

  get isDeleted(): boolean { return this.deletedAt !== null; }
  set isDeleted(value: boolean) { this.deletedAt = value ? new Date() : null; }
}
