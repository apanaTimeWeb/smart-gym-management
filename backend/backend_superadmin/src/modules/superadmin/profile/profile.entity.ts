// RESPONSIBILITY: TypeORM persistence entity for profile feature data stored in `superadmin_profiles`.
// FLOW: profile repository -> SuperadminProfile entity -> PostgreSQL `superadmin_profiles`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

export enum SuperadminProfileRole {
  SUPERADMIN = 'SUPERADMIN',
}

@Entity('superadmin_profiles')
@Index('IDX_superadmin_profiles_updated_at', ['updatedAt'])
export class SuperadminProfileEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  @Index('IDX_superadmin_profiles_email')
  @Column({ name: 'email', type: 'varchar', length: 500 })
  email!: string;
  @Column({ name: 'phone', type: 'varchar', length: 100, default: '' })
  phone!: string;
  @Column({ name: 'timezone', type: 'varchar', length: 100, default: 'Asia/Kolkata' })
  timezone!: string;
  @Column({ name: 'language', type: 'varchar', length: 20, default: 'en' })
  language!: string;
  @Column({ name: 'role', type: 'enum', enum: SuperadminProfileRole })
  role!: SuperadminProfileRole;
  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl!: string | null;
  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt!: Date | null;
  @Column({ name: 'two_factor_enabled', type: 'boolean', default: false })
  twoFactorEnabled!: boolean;
  @Column({ name: 'password_hash', type: 'varchar', length: 500 })
  passwordHash!: string;
}
