// RESPONSIBILITY: Validates bounded realtime replay queries for reconnecting Admin clients.
// FLOW: GET /admin/realtime/replay -> AdminCoreRealtimeReplayQueryDto -> tenant-scoped replay query -> response envelope.
import { ApiPropertyOptional 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@nestjs/swagger';
import { Type 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Max, Min 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';

/**
 * @description Defines the bounded replay cursor contract for reconnecting Admin clients.
 * @remarks Replay is tenant-scoped by trusted server context; the DTO does not select a tenant.
 */
export class AdminCoreRealtimeReplayQueryDto {
  @ApiPropertyOptional({ description: 'Return persisted events created strictly after this ISO-8601 timestamp.' 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
})
  @IsOptional()
  @IsDateString()
  after?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 50 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 50;

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

