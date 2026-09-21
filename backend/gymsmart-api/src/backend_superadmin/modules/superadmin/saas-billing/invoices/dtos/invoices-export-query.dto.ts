// RESPONSIBILITY: Validates invoice export filter input.
// FLOW: HTTP query -> DTO -> repository query -> export contract.
import { IsOptional, IsString } from 'class-validator';
export class InvoicesExportQueryDto { @IsOptional() @IsString() tenantId?: string; @IsOptional() @IsString() status?: string; }
