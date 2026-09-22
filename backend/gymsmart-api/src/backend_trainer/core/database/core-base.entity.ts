// RESPONSIBILITY: Defines the shared persistence base contract required by every tenant entity.
// FLOW: Entity extends CoreBaseEntity → UUID/timestamps/soft-delete columns.


import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' }) id!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }) updatedAt!: Date;
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true }) deletedAt!: Date | null;
}
