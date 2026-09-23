// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the messaging feature; no business logic.
// FLOW: messaging service -> MessagingRepository -> TypeORM Repository<MessagingEntity> -> PostgreSQL `tenant_messages`.
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { MessagingEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import type { MessagingListQuery, MessagingCreateInput, MessagingUpdateInput } from '@/backend_superadmin/modules/superadmin/messaging/types/messaging.interfaces';

@Injectable()
export class MessagingRepository extends BaseRepository<MessagingEntity> {
  constructor(@InjectRepository(MessagingEntity) repository: Repository<MessagingEntity>, transactionContext: TransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext, true); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: MessagingListQuery): Promise<{ items: MessagingEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.subject ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantId': 'item.tenant_id', 'tenantName': 'item.tenant_name', 'subject': 'item.subject', 'body': 'item.body'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Builds the WhatsApp bulk-center contract from current tenants and message history. */
  async getWhatsAppBulkCenter(): Promise<{ templates: Array<{ id: string; name: string; category: 'BILLING' | 'ONBOARDING' | 'OPERATIONS' | 'ANNOUNCEMENT' | 'SECURITY' | 'CUSTOM'; description: string; title: string; body: string; variables: string[]; status: 'READY' | 'DRAFT'; recommendedAudienceId: string }>; audiences: Array<{ id: string; label: string; description: string; recipientType: 'TENANT_CONTACT' }>; recipients: Array<{ id: string; tenantId: string; tenantName: string; contactName: string; contactRole: string; phone: string; audienceKey: string; planName: string | null; subscriptionAmount: number | null; invoiceNumber: string | null; dueDate: string | null; trialEndDate: string | null; maintenanceStart: string | null; maintenanceEnd: string | null; affectedService: string | null; supportLink: string | null; dashboardLink: string | null; whatsappOptIn: boolean }>; campaigns: Array<{ id: string; name: string; audienceLabel: string; templateName: string; totalRecipients: number; sentCount: number; skippedCount: number; status: 'READY' | 'RUNNING' | 'COMPLETED' | 'PAUSED'; createdAt: string }>; variables: string[] }> {
    const tenants = await this.dataSource.query(`SELECT id,name,owner_name,phone,plan,monthly_revenue,trial_ends_at,usage_stats FROM tenants WHERE deleted_at IS NULL ORDER BY name ASC LIMIT 1000`) as Array<{ id: string; name: string; owner_name: string; phone: string; plan: string; monthly_revenue: number; trial_ends_at: string | null; usage_stats: unknown }>;
    const messages = await this.findPage({ page: 1, limit: 1000, sortBy: 'createdAt', sortOrder: 'DESC' });
    const templateMap = new Map<string, { count: number; channel: string; body: string }>();
    const campaignMap = new Map<string, { templateName: string; audienceLabel: string; totalRecipients: number; sentCount: number; skippedCount: number; status: 'READY' | 'RUNNING' | 'COMPLETED' | 'PAUSED'; createdAt: string }>();
    for (const row of messages.items) {
      if (row.channel !== 'WHATSAPP') continue;
      const entry = templateMap.get(row.subject) ?? { count: 0, channel: row.channel, body: row.body };
      entry.count += 1;
      templateMap.set(row.subject, entry);
      const metadata = row.campaignMetadata ?? {};
      if (typeof metadata.campaignName === 'string') campaignMap.set(metadata.campaignName, { templateName: row.subject, audienceLabel: typeof metadata.audienceLabel === 'string' ? metadata.audienceLabel : 'TENANT_CONTACT', totalRecipients: Number(metadata.totalRecipients ?? 0), sentCount: row.status === 'SENT' ? Number(metadata.sentCount ?? 1) : Number(metadata.sentCount ?? 0), skippedCount: Number(metadata.skippedCount ?? 0), status: row.status === 'SENT' ? 'COMPLETED' : 'RUNNING', createdAt: row.createdAt.toISOString() });
    }
    const variables = [...new Set(messages.items.filter((row) => row.channel === 'WHATSAPP').flatMap((row) => { const match = row.body.match(/\{\{[^}]+\}\}/g) ?? []; return match; }))];
    const templates = [...templateMap.entries()].map(([name, value], index) => ({ id: `template-${index + 1}`, name, category: 'CUSTOM' as const, description: 'Derived from persisted WhatsApp message history.', title: name, body: value.body, variables, status: 'READY' as const, recommendedAudienceId: 'all-tenants' }));
    const audiences = [{ id: 'all-tenants', label: 'All Tenants', description: 'All active tenant contacts.', recipientType: 'TENANT_CONTACT' as const }];
    const recipients = tenants.map((tenant) => { const stats = (tenant.usage_stats && typeof tenant.usage_stats === 'object' ? tenant.usage_stats : {}) as Record<string, unknown>; return { id: tenant.id, tenantId: tenant.id, tenantName: tenant.name, contactName: tenant.owner_name, contactRole: 'OWNER', phone: tenant.phone, audienceKey: 'all-tenants', planName: tenant.plan, subscriptionAmount: tenant.monthly_revenue, invoiceNumber: null, dueDate: null, trialEndDate: tenant.trial_ends_at, maintenanceStart: typeof stats.maintenanceStart === 'string' ? stats.maintenanceStart : null, maintenanceEnd: typeof stats.maintenanceEnd === 'string' ? stats.maintenanceEnd : null, affectedService: typeof stats.affectedService === 'string' ? stats.affectedService : null, supportLink: typeof stats.supportLink === 'string' ? stats.supportLink : null, dashboardLink: typeof stats.dashboardLink === 'string' ? stats.dashboardLink : null, whatsappOptIn: stats.whatsappOptIn === true }; });
    const campaigns = [...campaignMap.entries()].map(([id, value]) => ({ id, name: id, ...value }));
    return { templates, audiences, recipients, campaigns, variables };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<MessagingEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<MessagingEntity> { return super.findByIdOrThrow(id, 'Messaging record not found'); }

  /** Creates and persists a messaging record. */
  async createMessaging(input: MessagingCreateInput): Promise<MessagingEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a messaging record. */
  async updateMessagingById(id: string, input: MessagingUpdateInput): Promise<MessagingEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one messaging record. */
  async deleteMessagingById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}