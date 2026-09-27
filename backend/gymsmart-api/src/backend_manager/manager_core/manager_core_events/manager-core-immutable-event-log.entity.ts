// RESPONSIBILITY: Stores append-only Manager domain events used for historical analytics and replay.
// FLOW: Core event emission -> tenant event log insert -> analytics consumers read without mutating history.
import { Check, Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

@Entity('manager_events_log')
@Index('IDX_manager_events_log_name_created_at', ['eventName', 'createdAt'])
@Index('IDX_manager_events_log_source_entity_created_at', ['sourceEntity', 'sourceEntityId', 'createdAt'])
@Check('CHK_manager_events_log_payload_object', "jsonb_typeof(payload) = 'object'")
export class ManagerCoreImmutableEventLogEntity extends CoreBaseEntity {
  @Column({ type: 'varchar', length: 160, name: 'event_name' }) eventName!: string;
  @Column({ type: 'varchar', length: 96, name: 'source_entity' }) sourceEntity!: string;
  @Column({ type: 'uuid', name: 'source_entity_id', nullable: true }) sourceEntityId!: string | null;
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" }) payload!: Record<string, unknown>;
  @Column({ type: 'timestamptz', name: 'occurred_at', default: () => 'CURRENT_TIMESTAMP' }) occurredAt!: Date;
}
