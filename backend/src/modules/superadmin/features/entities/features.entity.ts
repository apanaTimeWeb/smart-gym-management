import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {    } from '../features.interfaces';

@Entity('features')
export class FeatureFlag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  isGlobalEnabled: boolean;

  @Column({ type: 'jsonb', default: [] })
  enabledTenantIds: string[];


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
