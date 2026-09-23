// RESPONSIBILITY: Defines the stable response data contract for white-labeling endpoints.
// FLOW: Domain model -> WhiteLabelingResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class WhiteLabelingResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  gymId!: string;
  @ApiPropertyOptional()
  gymName!: string;
  @ApiPropertyOptional()
  domain!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  sslStatus!: string;
  @ApiPropertyOptional()
  logoUrl!: string | null;
  @ApiPropertyOptional()
  primaryColor!: string | null;
}