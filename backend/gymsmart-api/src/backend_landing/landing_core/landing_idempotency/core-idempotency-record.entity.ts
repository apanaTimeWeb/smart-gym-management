// RESPONSIBILITY: Maps durable idempotency state used to make critical mutations safe across retries and Redis failures.
// FLOW: IdempotencyService â†’ CoreIdempotencyRepository â†’ tenant PostgreSQL idempotency_records.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CoreBaseEntity } from '@/backend_landing/landing_core/database/base.entity';

import type { ApiResponse } from '@/backend_landing/landing_core/landing_types/api-response.types';


@Entity('idempotency_records')
@Index('UQ_idempotency_records_scope_key', ['scope', 'key'], { unique: true })
@Index('IDX_idempotency_records_created_at', ['createdAt'])
export class CoreIdempotencyRecordEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_idempotency_records' })
  declare id: string;

  @Column({ length: 120 })
  scope!: string;

  @Column({ length: 255 })
  key!: string;

  @Column({ name: 'request_hash', length: 64 })
  requestHash!: string;

  @Column({ type: 'boolean', default: true })
  processing!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  response!: ApiResponse<null> | null;
}
