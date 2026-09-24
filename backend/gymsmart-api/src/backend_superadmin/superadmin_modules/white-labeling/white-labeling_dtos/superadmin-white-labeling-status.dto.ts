import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates SuperadminWhiteLabelDomainStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { WhiteLabelDomainStatus } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.constants';

/**
 * Primary Intent: Defines SuperadminWhiteLabelDomainStatusDto as the class-level contract for superadmin-white-labeling-status.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminWhiteLabelDomainStatusDto {
  @IsEnum(WhiteLabelDomainStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-white-labeling-status.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: WhiteLabelDomainStatus;
}
