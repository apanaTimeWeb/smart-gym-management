// RESPONSIBILITY: Persists Manager communications delivery jobs as a tenant-scoped durable outbox queue.
// FLOW: Communications mutation -> delivery job row -> locked worker claim -> adapter -> retry or terminal state.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';
import { CommunicationsDeliveryJobStatus, CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

@Entity('manager_communications_delivery_jobs')
@Check('CHK_manager_comm_delivery_attempts_nonnegative', 'attempts >= 0')
@Check('CHK_manager_comm_delivery_max_attempts_positive', 'max_attempts >= 1')
@Index('IDX_manager_comm_delivery_status_next_attempt', ['status', 'nextAttemptAt'])
@Index('IDX_manager_comm_delivery_communication_id', ['communicationId'])
export class ManagerCommunicationsDeliveryJobEntity extends CoreBaseEntity {
  @Column({ type: 'uuid', name: 'communication_id' })
  communicationId!: string;

  @Column({ type: 'enum', enum: CommunicationsDeliveryMedium, enumName: 'manager_communications_delivery_medium_enum', name: 'delivery_medium' })
  deliveryMedium!: CommunicationsDeliveryMedium;

  @Column({ type: 'enum', enum: CommunicationsDeliveryJobStatus, enumName: 'manager_communications_delivery_job_status_enum', name: 'status', default: CommunicationsDeliveryJobStatus.QUEUED })
  status!: CommunicationsDeliveryJobStatus;

  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'integer', name: 'attempts', default: 0 })
  attempts!: number;

  @Column({ type: 'integer', name: 'max_attempts', default: 5 })
  maxAttempts!: number;

  @Column({ type: 'timestamptz', name: 'next_attempt_at', default: () => 'CURRENT_TIMESTAMP' })
  nextAttemptAt!: Date;

  @Column({ type: 'text', name: 'last_error', nullable: true })
  lastError!: string | null;
}

export { ManagerCommunicationsDeliveryJobEntity as CommunicationsDeliveryJobEntity };
