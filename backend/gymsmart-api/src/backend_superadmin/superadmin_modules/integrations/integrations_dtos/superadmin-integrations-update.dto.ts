import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the integrations HTTP boundary.
// FLOW: HTTP JSON -> SuperadminIntegrationsUpdateDto -> Integrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { IntegrationKeyStatus as IntegrationsStatus } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';
/**
 * Primary Intent: Defines SuperadminIntegrationsUpdateDto as the class-level contract for superadmin-integrations-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationsUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-integrations-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `label` data contract for this superadmin-integrations-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  label!: string;
  @IsOptional()
  @IsEnum(IntegrationsStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-integrations-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: IntegrationsStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `lastUsed` data contract for this superadmin-integrations-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastUsed!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `rateLimit` data contract for this superadmin-integrations-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  rateLimit!: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `secretHash` data contract for this superadmin-integrations-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  secretHash!: string;
}
