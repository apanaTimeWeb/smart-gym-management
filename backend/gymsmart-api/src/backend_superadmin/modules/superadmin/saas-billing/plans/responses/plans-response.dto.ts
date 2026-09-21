// RESPONSIBILITY: Defines the stable response data contract for plans endpoints.
// FLOW: Domain model -> PlansResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PlansResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  name!: string;
  @ApiPropertyOptional()
  priceMonthly!: number;
  @ApiPropertyOptional()
  priceAnnual!: number;
  @ApiPropertyOptional()
  maxMembers!: number;
  @ApiPropertyOptional()
  maxStaff!: number;
  @ApiPropertyOptional()
  dbLimitGb!: number;
  @ApiPropertyOptional()
  binaryLimitGb!: number;
  @ApiPropertyOptional()
  features!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  activeTenants!: number;
  @ApiPropertyOptional()
  isPublic!: boolean;
  @ApiPropertyOptional()
  trialDays!: number;
  @ApiPropertyOptional()
  setupFee!: number;
  @ApiPropertyOptional()
  currency!: string;
  @ApiPropertyOptional()
  isArchived!: boolean;
}
