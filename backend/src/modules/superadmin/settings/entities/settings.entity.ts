import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {    } from '../settings.interfaces';

@Entity('settings')
export class GlobalSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'varchar' })
  group: string;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
