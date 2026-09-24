// RESPONSIBILITY: Validates and persists a frozen WhatsApp campaign contract; no HTTP parsing or fixture data.
// FLOW: MessagingSpecialController -> SuperadminMessagingWhatsappCampaignCreateDto -> SuperadminMessagingWhatsappCampaignService -> SuperadminMessagingRepository.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { TenantMessageChannel, TenantMessageStatus } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';
import { SuperadminMessagingWhatsappCampaignCreateDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_dtos/superadmin-messaging-whatsapp-campaign-create.dto';
import { SuperadminMessagingWhatsappCampaignResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-whatsapp-campaign-response.dto';

/**
 * Primary Intent: Defines SuperadminMessagingWhatsappCampaignService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminMessagingWhatsappCampaignService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
/**
 * Primary Intent: Executes the createMessagingWhatsAppCampaign use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the createMessagingWhatsAppCampaign use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createMessagingWhatsAppCampaign(input: SuperadminMessagingWhatsappCampaignCreateDto): Promise<SuperadminMessagingWhatsappCampaignResponseDto> {
    const created = await this.repository.createMessaging(this.toCreateInput(input));
    return this.toResponse(input, created);
  }

  /**
 * Primary Intent: Executes the `toCreateInput` responsibility owned by this feature-local superadmin-messaging-whatsapp-campaign.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the toCreateInput use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private toCreateInput(input: SuperadminMessagingWhatsappCampaignCreateDto): Record<string, unknown> {
    return {
      tenantId: input.audienceId, tenantName: input.audienceId, channel: TenantMessageChannel.WHATSAPP,
      subject: input.name, body: JSON.stringify({ templateId: input.templateId, recipientIds: input.recipientIds }),
      status: TenantMessageStatus.QUEUED, sentAt: null, scheduledAt: null,
      campaignMetadata: { name: input.name, audienceId: input.audienceId, templateId: input.templateId, recipientIds: input.recipientIds },
    };
  }

  /**
 * Primary Intent: Executes the `toResponse` responsibility owned by this superadmin-messaging-whatsapp-campaign.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  private toResponse(input: SuperadminMessagingWhatsappCampaignCreateDto, created: { id: string; createdAt: Date }): SuperadminMessagingWhatsappCampaignResponseDto {
    return { id: created.id, name: input.name, audienceLabel: input.audienceId, templateName: input.templateId,
      totalRecipients: input.recipientIds.length, sentCount: 0, skippedCount: 0, status: 'READY', createdAt: created.createdAt.toISOString() };
  }
}
