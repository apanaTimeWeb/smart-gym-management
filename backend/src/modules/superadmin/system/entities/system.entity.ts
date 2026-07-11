import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {    } from '../system.interfaces';

@Entity('system')
export class ReleaseNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  version: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
