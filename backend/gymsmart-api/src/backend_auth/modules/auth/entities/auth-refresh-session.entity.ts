// RESPONSIBILITY: Maps persisted refresh-session rotation state; only a token hash is stored.
// FLOW: AuthRefreshSessionRepository -> AuthRefreshSessionEntity -> PostgreSQL auth_refresh_sessions.

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CoreBaseEntity } from '@/backend_auth/core/database/core-base-entity';
import { AuthUserEntity } from '@/backend_auth/modules/auth/entities/auth-user.entity';
@Entity('auth_refresh_sessions')
@Unique('UQ_auth_refresh_sessions_refresh_token_hash', ['refreshTokenHash'])
@Index('IDX_auth_refresh_sessions_user_id', ['userId'])
@Index('IDX_auth_refresh_sessions_expires_at', ['expiresAt'])
export class AuthRefreshSessionEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_auth_refresh_sessions' })
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' }) userId!: string;
  @ManyToOne(() => AuthUserEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_auth_refresh_sessions_auth_users_user_id' })
  user!: AuthUserEntity;

  @Column({ name: 'refresh_token_hash', type: 'varchar', length: 128 }) refreshTokenHash!: string;
  @Column({ name: 'expires_at', type: 'timestamptz' }) expiresAt!: Date;
  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true }) revokedAt!: Date | null;
}
