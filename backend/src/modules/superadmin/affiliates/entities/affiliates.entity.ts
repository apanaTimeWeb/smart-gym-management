import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {  AffiliateStatus  } from '../affiliates.interfaces';

@Entity('affiliates')
export class Affiliate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  referralCode: string;

  @Column({ type: 'int', default: 0 })
  totalReferred: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  commissionEarned: number;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: AffiliateStatus;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
