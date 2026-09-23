// RESPONSIBILITY: Defines the stable response data contract for broadcasts endpoints.
// FLOW: Domain model -> SuperadminBroadcastsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminBroadcastsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  title!: string;
  @ApiPropertyOptional()
  content!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional({ type: [String] })
  targetGymIds!: string[];
  @ApiPropertyOptional()
  scheduledDate!: string | null;
  @ApiPropertyOptional()
  sentDate!: string | null;
  @ApiPropertyOptional()
  totalRecipients!: number;
  @ApiPropertyOptional()
  deliveredCount!: number;
  @ApiPropertyOptional()
  failedCount!: number;
  @ApiPropertyOptional()
  audience!: string;
}

export class SuperadminBroadcastsTenantDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional() name!: string;
  @ApiPropertyOptional() plan!: string;
  @ApiPropertyOptional() ownerName?: string;
  @ApiPropertyOptional() phone?: string;
}

export class SuperadminBroadcastDeliveryResultDto {
  @ApiPropertyOptional({ type: SuperadminBroadcastsResponseDto }) broadcast!: SuperadminBroadcastsResponseDto;
  @ApiPropertyOptional() recipientId!: string;
  @ApiPropertyOptional() deliveryStatus!: string;
  @ApiPropertyOptional() deliveredAt?: string | null;
}

export class SuperadminBroadcastAudienceInsightsDto {
  @ApiPropertyOptional() segments!: Array<Record<string, unknown>>;
  @ApiPropertyOptional() channels!: Array<Record<string, unknown>>;
  @ApiPropertyOptional() templates!: string[];
}