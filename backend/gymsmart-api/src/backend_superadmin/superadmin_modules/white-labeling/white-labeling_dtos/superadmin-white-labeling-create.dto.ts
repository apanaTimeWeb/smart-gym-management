import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the white-labeling HTTP boundary.
// FLOW: HTTP JSON -> SuperadminWhiteLabelingCreateDto -> WhiteLabeling service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { WhiteLabelingStatus, WhiteLabelingSslStatus } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.constants';
/**
 * Primary Intent: Defines SuperadminWhiteLabelingCreateDto as the class-level contract for superadmin-white-labeling-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminWhiteLabelingCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `gymId` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymId!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `gymName` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymName!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `domain` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  domain!: string;
  @IsEnum(WhiteLabelingStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: WhiteLabelingStatus;
  @IsEnum(WhiteLabelingSslStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `sslStatus` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sslStatus!: WhiteLabelingSslStatus;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `logoUrl` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  logoUrl!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `primaryColor` data contract for this superadmin-white-labeling-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  primaryColor!: string;
}
