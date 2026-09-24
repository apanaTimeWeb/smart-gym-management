// RESPONSIBILITY: Defines the integrations page response contract.
// FLOW: Integrations query service -> response DTO -> canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminIntegrationsResponseDataDto as the class-level contract for superadmin-integrations-response-data.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationTenantDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
}
/**
 * Primary Intent: Defines SuperadminIntegrationKeyDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminIntegrationKeyDto {
  @ApiProperty() id!: string;
  @ApiProperty() tenant!: string;
  @ApiProperty() label!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() lastUsed!: string | null;
  @ApiProperty() rateLimit!: string;
}

/**
 * Primary Intent: Defines SuperadminIntegrationItemDto as the class-level contract for superadmin-integrations-response-data.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationItemDto {
  @ApiProperty() name!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() lastEvent!: string | null;
  @ApiProperty() failedEvents!: number;
  @ApiProperty() health!: number;
}
/**
 * Primary Intent: Defines SuperadminWebhookDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminWebhookDto {
  @ApiProperty() id!: string;
  @ApiProperty() event!: string;
  @ApiProperty() integration!: string;
  @ApiProperty() status!: string;
  @ApiProperty() attempts!: number;
  @ApiProperty() latency!: number;
  @ApiProperty() time!: string;
}

/**
 * Primary Intent: Defines SuperadminIntegrationsResponseDataDto as the class-level contract for superadmin-integrations-response-data.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationsResponseDataDto {
  @ApiProperty({ type: [SuperadminIntegrationTenantDto] }) tenants!: SuperadminIntegrationTenantDto[];
  @ApiProperty({ type: [SuperadminIntegrationItemDto] }) integrations!: SuperadminIntegrationItemDto[];
  @ApiProperty({ type: [SuperadminWebhookDto] }) webhooks!: SuperadminWebhookDto[];
  @ApiProperty({ type: [SuperadminIntegrationKeyDto] }) keys!: SuperadminIntegrationKeyDto[];
}
/**
 * Primary Intent: Defines SuperadminGenerateApiKeyResultDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminGenerateApiKeyResultDto {
  @ApiProperty({ type: SuperadminIntegrationKeyDto }) key!: SuperadminIntegrationKeyDto;
  @ApiProperty() secretKey!: string;
  @ApiPropertyOptional({ isArray: true }) scopes?: string[];
}
