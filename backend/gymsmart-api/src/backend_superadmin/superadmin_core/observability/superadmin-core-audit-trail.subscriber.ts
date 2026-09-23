// RESPONSIBILITY: Captures persistence-layer mutations with before/after state for complete audit coverage.
// FLOW: TypeORM before mutation -> QueryRunner snapshot -> mutation -> audit_logs insert in the same connection.
import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, SoftRemoveEvent } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-request-context';

type MutationEvent = InsertEvent<unknown> | UpdateEvent<unknown> | SoftRemoveEvent<unknown>;
const SNAPSHOT_KEY = 'backend_superadmin_audit_old_state';

@Injectable()
@EventSubscriber()
export class SuperadminAuditTrailSubscriber implements EntitySubscriberInterface {
  /** Captures the persisted state before an update so partial ORM updates still get a complete old snapshot. */
  async beforeUpdate(event: UpdateEvent<unknown>): Promise<void> { await this.captureBeforeState(event); }
  /** Captures the persisted state before a soft delete so audit old/new state is complete. */
  async beforeSoftRemove(event: SoftRemoveEvent<unknown>): Promise<void> { await this.captureBeforeState(event); }
  /** Records the authoritative state created by an INSERT. */
  async afterInsert(event: InsertEvent<unknown>): Promise<void> { await this.write(event, 'INSERT', null, this.sanitize(event.entity)); }
  /** Records the complete before/after state created by an UPDATE. */
  async afterUpdate(event: UpdateEvent<unknown>): Promise<void> {
    const oldValue = event.queryRunner.data[SNAPSHOT_KEY] ?? event.entity ?? null;
    await this.write(event, 'UPDATE', this.sanitize(oldValue), this.sanitize(this.mergeEntity(oldValue, event.entity)));
    delete event.queryRunner.data[SNAPSHOT_KEY];
  }
  /** Records a soft deletion without introducing a hard-delete audit path. */
  async afterSoftRemove(event: SoftRemoveEvent<unknown>): Promise<void> {
    const oldValue = event.queryRunner.data[SNAPSHOT_KEY] ?? event.databaseEntity ?? null;
    await this.write(event, 'SOFT_DELETE', this.sanitize(oldValue), this.sanitize(event.entity ?? { id: this.entityId(event), deletedAt: new Date() }));
    delete event.queryRunner.data[SNAPSHOT_KEY];
  }

  /** Reads the persisted row before a mutation and stores it in the current QueryRunner only. */
  private async captureBeforeState(event: UpdateEvent<unknown> | SoftRemoveEvent<unknown>): Promise<void> {
    const id = this.entityId(event);
    if (!id) return;
    const repository = event.manager.getRepository(event.metadata.target);
    const primaryColumn = event.metadata.primaryColumns[0];
    const row = primaryColumn ? await repository.findOne({ where: { [primaryColumn.propertyName]: id } as Record<string, unknown> }) : null;
    event.queryRunner.data[SNAPSHOT_KEY] = row;
  }

  /** Writes a mutation audit record using the same transaction/connection as the source mutation. */
  private async write(event: MutationEvent, action: string, oldValue: unknown, newValue: unknown): Promise<void> {
    if (event.metadata.tableName === 'audit_logs') return;
    const context = getRequestContext();
    await event.manager.query('INSERT INTO audit_logs (id, actor_id, actor_role, action, entity_type, entity_id, old_value, new_value, ip_address, tenant_id, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9,$10,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)', [
      randomUUID(), context?.userId ?? 'SYSTEM', context?.userRole ?? 'SYSTEM', action, event.metadata.tableName, this.entityId(event), JSON.stringify(oldValue ?? null), JSON.stringify(newValue ?? null), context?.ipAddress ?? 'worker', context?.tenantId ?? null,
    ]);
  }

  /** Extracts the primary key from a TypeORM mutation event. */
  private entityId(event: MutationEvent): string {
    const primaryColumn = event.metadata.primaryColumns[0];
    const entity = event.entity as Record<string, unknown> | undefined;
    const database = (event as any).databaseEntity as Record<string, unknown> | undefined;
    const key = primaryColumn?.propertyName ?? 'id';
    return String(entity?.[key] ?? database?.[key] ?? '');
  }

  /** Merges an ORM partial update onto the persisted pre-mutation row. */
  private mergeEntity(oldValue: unknown, entity: unknown): unknown {
    if (!oldValue || typeof oldValue !== 'object') return entity;
    if (!entity || typeof entity !== 'object') return oldValue;
    return { ...(oldValue as object), ...(entity as object) };
  }

  /** Masks credentials and sensitive PII before audit records leave the mutation boundary. */
  private sanitize(value: unknown): unknown {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map((item) => this.sanitize(item));
    const source = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(source)) {
      const lower = key.toLowerCase();
      if (['password','passwordhash','temporarypassword','aadharnumber','aadharnumberencrypted','bankaccount','cardnumber','otp','token','refreshtoken'].some((name) => lower.includes(name))) { output[key] = '[REDACTED]'; continue; }
      if (lower.includes('email') && typeof item === 'string') { output[key] = item.replace(/^(.).+(@.+)$/, '$1***$2'); continue; }
      if (lower.includes('phone') && typeof item === 'string') { output[key] = item.length > 4 ? `${'*'.repeat(item.length - 4)}${item.slice(-4)}` : '[REDACTED]'; continue; }
      output[key] = this.sanitize(item);
    }
    return output;
  }
}
