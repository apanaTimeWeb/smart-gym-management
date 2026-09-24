import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the white-labeling HTTP boundary.
// FLOW: HTTP JSON -> SuperadminWhiteLabelingUpdateDto -> WhiteLabeling service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { WhiteLabelingStatus, WhiteLabelingSslStatus } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.constants';
/**
 * Primary Intent: Defines SuperadminWhiteLabelingUpdateDto as the class-level contract for superadmin-white-labeling-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminWhiteLabelingUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `gymId` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymId!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `gymName` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymName!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `domain` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  domain!: string;
  @IsOptional()
  @IsEnum(WhiteLabelingStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: WhiteLabelingStatus;
  @IsOptional()
  @IsEnum(WhiteLabelingSslStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `sslStatus` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sslStatus!: WhiteLabelingSslStatus;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `logoUrl` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  logoUrl!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `primaryColor` data contract for this superadmin-white-labeling-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  primaryColor!: string;
}
