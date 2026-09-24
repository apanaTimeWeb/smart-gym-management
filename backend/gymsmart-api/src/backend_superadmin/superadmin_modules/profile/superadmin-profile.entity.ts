// RESPONSIBILITY: TypeORM persistence entity for profile feature data stored in `superadmin_profiles`.
// FLOW: profile repository -> SuperadminProfile entity -> PostgreSQL `superadmin_profiles`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminProfileRole } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.constants';

/**
 * Primary Intent: Defines SuperadminProfileEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_profiles')
@Index('IDX_superadmin_profiles_updated_at', ['updatedAt'])
export class SuperadminProfileEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property name. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  /**
 * Primary Intent: Documents entity property email. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Index('IDX_superadmin_profiles_email')
  @Column({ name: 'email', type: 'varchar', length: 500 })
  email!: string;
  /**
 * Primary Intent: Documents entity property phone. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'phone', type: 'varchar', length: 100, default: '' })
  phone!: string;
  /**
 * Primary Intent: Documents entity property timezone. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'timezone', type: 'varchar', length: 100, default: 'Asia/Kolkata' })
  timezone!: string;
  /**
 * Primary Intent: Documents entity property language. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'language', type: 'varchar', length: 20, default: 'en' })
  language!: string;
  /**
 * Primary Intent: Documents entity property role. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'role', type: 'enum', enum: SuperadminProfileRole })
  role!: SuperadminProfileRole;
  /**
 * Primary Intent: Documents entity property avatarUrl. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl!: string | null;
  /**
 * Primary Intent: Documents entity property lastLoginAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt!: Date | null;
  /**
 * Primary Intent: Documents entity property twoFactorEnabled. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'two_factor_enabled', type: 'boolean', default: false })
  twoFactorEnabled!: boolean;
  /**
 * Primary Intent: Documents entity property passwordHash. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'password_hash', type: 'varchar', length: 500 })
  passwordHash!: string;
  /**
 * Primary Intent: Documents entity property tokenVersion. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'token_version', type: 'integer', default: 0 })
  tokenVersion!: number;
}
