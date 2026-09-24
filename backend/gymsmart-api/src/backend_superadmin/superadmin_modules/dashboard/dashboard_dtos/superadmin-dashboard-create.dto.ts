import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the dashboard HTTP boundary.
// FLOW: HTTP JSON -> SuperadminDashboardCreateDto -> Dashboard service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminDashboardCreateDto as the class-level contract for superadmin-dashboard-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `kind` data contract for this superadmin-dashboard-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  kind!: string;
  @ApiProperty()
  /** Primary Intent: Defines the `payload` data contract for this superadmin-dashboard-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  payload!: Record<string, unknown> | unknown[] | null;
}
