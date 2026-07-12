import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { TenantStatus } from '../tenants.interfaces';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  ownerName: string;

  @Column({ type: 'varchar', unique: true })
  adminEmail: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', default: 'TRIAL' })
  status: TenantStatus;

  @Column({ type: 'varchar' })
  plan: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'int', default: 0 })
  memberCount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  monthlyRevenue: number;

  @Column({ type: 'varchar', default: '1.0.0' })
  databaseVersion: string;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
