// RESPONSIBILITY: Validates invoice export filter input.
// FLOW: HTTP query -> DTO -> repository query -> export contract.
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsOptional, IsString} from 'class-validator';
/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesExportQueryDto as the class-level contract for superadmin-saas-billing-invoices-export-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingInvoicesExportQueryDto {@ApiPropertyOptional()
 @IsOptional() @IsString() tenantId?: string;@ApiPropertyOptional()
 @IsOptional() @IsString() status?: string;
 @IsOptional() @IsString() @ApiPropertyOptional({ required: false }) preset?: string;
 @IsOptional() @IsString() @ApiPropertyOptional({ required: false }) timeRange?: string;
 @IsOptional() @IsString() @ApiPropertyOptional({ required: false }) customStart?: string;
 @IsOptional() @IsString() @ApiPropertyOptional({ required: false }) customEnd?: string;
}

