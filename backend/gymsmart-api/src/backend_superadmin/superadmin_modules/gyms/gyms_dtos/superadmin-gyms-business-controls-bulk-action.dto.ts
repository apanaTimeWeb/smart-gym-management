import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the exact Gyms V1 bulk-action request accepted by the frontend.
// FLOW: HTTP body -> class-validator -> SuperadminGymsBulkActionService.
import { IsArray, IsIn, IsOptional, IsString, IsUUID, ArrayNotEmpty } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminGymsBusinessControlsBulkActionDto as the class-level contract for superadmin-gyms-business-controls-bulk-action.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsBusinessControlsBulkActionDto {
  @IsIn(['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'])
  @ApiProperty()
  /** Primary Intent: Defines the `action` data contract for this superadmin-gyms-business-controls-bulk-action.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  action!: 'Send message' | 'Extend trial' | 'Export selected' | 'Move plan' | 'Suspend selected';

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty()
  /** Primary Intent: Defines the `gymIds` data contract for this superadmin-gyms-business-controls-bulk-action.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymIds!: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `targetPlan` data contract for this superadmin-gyms-business-controls-bulk-action.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetPlan?: string;
}
