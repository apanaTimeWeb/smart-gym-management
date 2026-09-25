import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the integrations HTTP boundary.
// FLOW: HTTP JSON -> SuperadminIntegrationsCreateDto -> Integrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { IntegrationKeyStatus as IntegrationKeyStatus } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';
/**
 * Primary Intent: Defines SuperadminIntegrationsCreateDto as the class-level contract for superadmin-integrations-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationsCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-integrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `label` data contract for this superadmin-integrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  label!: string;
  @IsEnum(IntegrationKeyStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-integrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: IntegrationKeyStatus;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `lastUsed` data contract for this superadmin-integrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastUsed!: Date;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `rateLimit` data contract for this superadmin-integrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  rateLimit!: number;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `secretHash` data contract for this superadmin-integrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  secretHash!: string;
}
