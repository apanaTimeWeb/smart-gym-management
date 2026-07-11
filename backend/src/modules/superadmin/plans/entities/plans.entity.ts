import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import {  } from '../plans.interfaces';

@Entity('plans')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceMonthly: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAnnual: number;

  @Column({ type: 'int' })
  maxMembers: number;

  @Column({ type: 'int' })
  maxStaff: number;

  @Column({ type: 'jsonb', default: [] })
  features: string[];

  @Column({ type: 'int', default: 0 })
  activeTenants: number;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
