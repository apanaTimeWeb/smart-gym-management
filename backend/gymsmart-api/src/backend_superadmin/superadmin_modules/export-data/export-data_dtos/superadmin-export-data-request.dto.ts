import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the shared Superadmin export request contract.
// FLOW: HTTP JSON -> SuperadminExportDataRequestDto -> export service -> durable background job.
import { ArrayMaxSize, IsArray, IsEnum, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

import { ExportDataDeliveryMedium, ExportDataResource } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-request.constants';

/**
 * Primary Intent: Defines SuperadminExportDataRequestDto as the class-level contract for superadmin-export-data-request.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminExportDataRequestDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsEnum(ExportDataResource, { each: true })
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `resources` data contract for this superadmin-export-data-request.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  resources?: ExportDataResource[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsString({ each: true })
  @MaxLength(128, { each: true })
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `tenantIds` data contract for this superadmin-export-data-request.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantIds?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['ZIP', 'CSV'])
  @ApiProperty()
  /** Primary Intent: Defines the `format` data contract for this superadmin-export-data-request.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  format: 'ZIP' | 'CSV' = 'ZIP';

  @IsOptional()
  @IsEnum(ExportDataDeliveryMedium)
  @ApiProperty()
  /** Primary Intent: Defines the `deliveryMedium` data contract for this superadmin-export-data-request.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  deliveryMedium: ExportDataDeliveryMedium = ExportDataDeliveryMedium.EMAIL;
}
