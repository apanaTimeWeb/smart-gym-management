import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the analytics HTTP boundary.
// FLOW: HTTP JSON -> SuperadminAnalyticsUpdateDto -> Analytics service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminAnalyticsUpdateDto as the class-level contract for superadmin-analytics-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAnalyticsUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `kind` data contract for this superadmin-analytics-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  kind!: string;
  @IsOptional()
  @ApiProperty()
  /** Primary Intent: Defines the `payload` data contract for this superadmin-analytics-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  payload!: Record<string, unknown> | unknown[] | null;
}
