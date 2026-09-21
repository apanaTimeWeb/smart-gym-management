// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin plans.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Plans response mapper → ApiResponse<T>.

export class AdminPlanDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() tier!: string;
  @ApiProperty() price1Month!: number;
  @ApiProperty() price3Month!: number;
  @ApiProperty() price6Month!: number;
  @ApiProperty() price12Month!: number;
  @ApiProperty({ type: [String] }) features!: string[];
  @ApiProperty() isActive!: boolean;
  @ApiPropertyOptional() freezeAllowed?: boolean;
  @ApiPropertyOptional() joiningFee?: number;
  @ApiPropertyOptional() ptSessionsIncluded?: number;
  @ApiPropertyOptional() taxRate?: number;
}

export class AdminPlanListResponseDto {
  @ApiProperty({ type: [AdminPlanDto] }) data!: AdminPlanDto[];
}

export class AdminPlanRevenueRecordDto {
  @ApiProperty() id!: string;
  @ApiProperty() planName!: string;
  @ApiProperty() tier!: string;
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() activeSubscriptions!: number;
  @ApiProperty() newSignups!: number;
  @ApiProperty() renewalRate!: number;
}

export class AdminPlanRevenueListResponseDto {
  @ApiProperty({ type: [AdminPlanRevenueRecordDto] }) data!: AdminPlanRevenueRecordDto[];
}
