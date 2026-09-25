import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates Superadmin API-key generation payloads including explicit permission scopes.
// FLOW: HTTP JSON -> SuperadminIntegrationsGenerateKeyDto -> key service -> repository.
import { ArrayMinSize, IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { IntegrationKeyScope } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';

/**
 * Primary Intent: Defines SuperadminIntegrationsGenerateKeyDto as the class-level contract for superadmin-integrations-generate-key.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationsGenerateKeyDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `label` data contract for this superadmin-integrations-generate-key.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  label!: string;

  @IsUUID()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-integrations-generate-key.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(IntegrationKeyScope, { each: true })
  @ApiProperty()
  /** Primary Intent: Defines the `scopes` data contract for this superadmin-integrations-generate-key.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  scopes!: IntegrationKeyScope[];
}
