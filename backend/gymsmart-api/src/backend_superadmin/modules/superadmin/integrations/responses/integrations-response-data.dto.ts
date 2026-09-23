// RESPONSIBILITY: Defines the integrations page response contract.
// FLOW: Integrations query service -> response DTO -> canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IntegrationsResponseDataDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
}

export class SuperadminIntegrationKeyDto {
  @ApiProperty() id!: string;
  @ApiProperty() tenant!: string;
  @ApiProperty() label!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() lastUsed!: string | null;
  @ApiProperty() rateLimit!: string;
}

export class SuperadminIntegrationItemDto {
  @ApiProperty() name!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() lastEvent!: string | null;
  @ApiProperty() failedEvents!: number;
  @ApiProperty() health!: number;
}

export class SuperadminWebhookDto {
  @ApiProperty() id!: string;
  @ApiProperty() event!: string;
  @ApiProperty() integration!: string;
  @ApiProperty() status!: string;
  @ApiProperty() attempts!: number;
  @ApiProperty() latency!: number;
  @ApiProperty() time!: string;
}

export class SuperadminIntegrationsResponseDataDto {
  @ApiProperty({ type: [IntegrationsResponseDataDto] }) tenants!: IntegrationsResponseDataDto[];
  @ApiProperty({ type: [SuperadminIntegrationItemDto] }) integrations!: SuperadminIntegrationItemDto[];
  @ApiProperty({ type: [SuperadminWebhookDto] }) webhooks!: SuperadminWebhookDto[];
  @ApiProperty({ type: [SuperadminIntegrationKeyDto] }) keys!: SuperadminIntegrationKeyDto[];
}

export class SuperadminGenerateApiKeyResultDto {
  @ApiProperty({ type: SuperadminIntegrationKeyDto }) key!: SuperadminIntegrationKeyDto;
  @ApiProperty() secretKey!: string;
  @ApiPropertyOptional({ isArray: true }) scopes?: string[];
}