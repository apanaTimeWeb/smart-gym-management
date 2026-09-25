// RESPONSIBILITY: Persists tenant-scoped realtime events so reconnecting clients can recover missed notifications.
// FLOW: Feature mutation -> transaction -> AdminCoreRealtimeEventEntity -> commit -> Redis Pub/Sub transport -> client.
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_realtime_events')
@Index('IDX_admin_realtime_events_tenant_created_at', ['tenantId', 'createdAt'])
/**
 * @description Defines the AdminCoreRealtimeEventEntity boundary for the admin_core_realtime backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreRealtimeEventEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_realtime_events_ID' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId!: string;

  @Column({ name: 'event_name', type: 'varchar', length: 200 })
  eventName!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
