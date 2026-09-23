// RESPONSIBILITY: Validates the shared Superadmin export request contract.
// FLOW: HTTP JSON -> ExportDataRequestDto -> export service -> durable background job.
import { ArrayMaxSize, IsArray, IsEnum, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export enum ExportDataDeliveryMedium {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
}

export enum ExportDataResource {
  GYMS = 'gyms',
  AUDIT_LOGS = 'audit_logs',
  INVOICES = 'invoices',
  REPORTS = 'reports',
  SETTINGS = 'settings',
}

export class ExportDataRequestDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsEnum(ExportDataResource, { each: true })
  resources?: ExportDataResource[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsString({ each: true })
  @MaxLength(128, { each: true })
  tenantIds?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['ZIP', 'CSV'])
  format: 'ZIP' | 'CSV' = 'ZIP';

  @IsOptional()
  @IsEnum(ExportDataDeliveryMedium)
  deliveryMedium: ExportDataDeliveryMedium = ExportDataDeliveryMedium.EMAIL;
}