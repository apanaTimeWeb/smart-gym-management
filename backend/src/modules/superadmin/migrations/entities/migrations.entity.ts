import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {  MigrationStatus  } from '../migrations.interfaces';

@Entity('migrations')
export class SchemaMigration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'timestamp', nullable: true })
  appliedAt: Date | null;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: MigrationStatus;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
