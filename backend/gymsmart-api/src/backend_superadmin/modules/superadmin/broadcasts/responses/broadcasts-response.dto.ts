// RESPONSIBILITY: Defines the stable response data contract for broadcasts endpoints.
// FLOW: Domain model -> BroadcastsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BroadcastsResponseDto {
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
  @ApiPropertyOptional({ type: BroadcastsResponseDto }) broadcast!: BroadcastsResponseDto;
  @ApiPropertyOptional() recipientId!: string;
  @ApiPropertyOptional() deliveryStatus!: string;
  @ApiPropertyOptional() deliveredAt?: string | null;
}

export class BroadcastAudienceInsightsDto {
  @ApiPropertyOptional() segments!: any[];
  @ApiPropertyOptional() channels!: any[];
  @ApiPropertyOptional() templates!: string[];
}
